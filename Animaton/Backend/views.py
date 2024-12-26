from functools import cache
from django.shortcuts import render
import requests
from rest_framework.views import APIView  # Import correct de APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.cache import cache_page
from django.core.cache import cache
import asyncio
import aiohttp
from functools import partial
import concurrent.futures

# Vue principale pour rendre la page d'accueil
def index(request):
    # Créer un contexte avec des données que vous souhaitez passer au modèle
    context = {}

    # Obtenir les données sur les meilleurs animes
    top_data = get_top_anime(request)

    # Ajouter les données sur les meilleurs animes au contexte
    context['top_anime_data'] = top_data

    # Rendre le modèle avec le contexte
    return render(request, "index.html", context)

# Fonction pour récupérer les meilleurs animes
def get_top_anime(request):
    url = "https://api.jikan.moe/v4/top/anime"
    response = requests.get(url)

    if response.status_code == 200:
        top_anime = response.json()
        return JsonResponse(top_anime, safe=False)
    else:
        print("Erreur lors de la récupération du top anime:", response.status_code)
        return JsonResponse({"error": "Failed to fetch top anime"}, status=500)

# Vue pour afficher les meilleurs animes
def top_anime_view(request):
    return get_top_anime(request)

# Fonction pour récupérer les meilleurs mangas
def get_top_manga(request):
    url = "https://api.jikan.moe/v4/top/manga"
    response = requests.get(url)

    if response.status_code == 200:
        top_manga = response.json()
        return JsonResponse(top_manga, safe=False)
    else:
        print("Erreur lors de la récupération du top manga:", response.status_code)
        return JsonResponse({"error": "Failed to fetch top manga"}, status=500)

# Fonction pour récupérer les meilleurs personnages
def get_top_characters(request):
    url = "https://api.jikan.moe/v4/top/characters"
    response = requests.get(url)

    if response.status_code == 200:
        top_characters = response.json()
        return JsonResponse(top_characters, safe=False)
    else:
        print("Erreur lors de la récupération du top characters:", response.status_code)
        return JsonResponse({"error": "Failed to fetch top characters"}, status=500)

# Fonction pour récupérer les recommandations d'anime
def get_recommendations_anime(request):
    url = "https://api.jikan.moe/v4/recommendations/anime"
    response = requests.get(url)

    if response.status_code == 200:
        recommendations = response.json()
        return JsonResponse(recommendations, safe=False)
    else:
        print("Erreur lors de la récupération des recommendations anime:", response.status_code)
        return JsonResponse({"error": "Failed to fetch recommendations anime"}, status=500)

# Fonction pour récupérer l'horaire des animes
def get_schedule(request):
    url = "https://api.jikan.moe/v4/schedules"
    response = requests.get(url)

    if response.status_code == 200:
        schedule = response.json()
        return JsonResponse(schedule, safe=False)
    else:
        print("Erreur lors de la récupération de l'horaire des animes:", response.status_code)
        return JsonResponse({"error": "Failed to fetch anime schedule"}, status=500)

# Vue pour afficher l'horaire des animes
def schedule(request):
    return get_schedule(request)

# Vue pour afficher les meilleurs mangas
def top_manga_view(request):
    return get_top_manga(request)

# Vue pour afficher les meilleurs personnages
def top_characters_view(request):
    return get_top_characters(request)

# Vue pour afficher les recommandations d'anime
def recommendations_anime_view(request):
    return get_recommendations_anime(request)

# Fonction asynchrone pour récupérer les données de streaming
async def fetch_streaming_data(session, anime_id):
    """Récupérer les données de streaming de manière asynchrone"""
    url = f"https://api.jikan.moe/v4/anime/{anime_id}/streaming"
    try:
        async with session.get(url) as response:
            if response.status == 200:
                data = await response.json()
                return data.get('data', [])
    except Exception:
        return []
    return []

# Fonction asynchrone pour traiter les détails individuels des animes
async def fetch_anime_details(session, anime):
    """Traitement des détails individuels des animes de manière asynchrone"""
    anime_info = {
        'id': anime.get('mal_id'),
        'title': anime.get('title', 'Titre non disponible'),
        'type': anime.get('type', 'Type non disponible'),
        'status': anime.get('status', 'Statut non disponible'),
        'episodes': anime.get('episodes', 'Non disponible'),
        'synopsis': anime.get('synopsis', 'Synopsis non disponible'),
        'image_url': anime['images'].get('jpg', {}).get('image_url', ''),
        'streaming': []
    }

    # Récupérer les données de streaming uniquement si spécifiquement demandé
    if 'include_streaming' in session.extra_info:
        streaming_data = await fetch_streaming_data(session, anime_info['id'])
        anime_info['streaming'] = streaming_data

    return anime_info

# Fonction asynchrone pour effectuer une recherche
async def async_search(query, include_streaming=False, limit=None):
    """Effectuer une recherche asynchrone"""
    async with aiohttp.ClientSession() as session:
        session.extra_info = {'include_streaming': include_streaming}

        # Récupérer les résultats des animes
        anime_url = f"https://api.jikan.moe/v4/anime?q={query}&sfw"
        async with session.get(anime_url) as response:
            if response.status != 200:
                return [], []

            anime_data = await response.json()
            anime_list = anime_data.get('data', [])

            if limit:
                anime_list = anime_list[:limit]

            # Traiter les détails des animes de manière concurrente
            tasks = [fetch_anime_details(session, anime) for anime in anime_list]
            anime_results = await asyncio.gather(*tasks)

            # Récupérer les résultats des mangas si nécessaire (simplifié pour la performance)
            manga_url = f"https://api.jikan.moe/v4/manga?q={query}&sfw"
            async with session.get(manga_url) as manga_response:
                if manga_response.status == 200:
                    manga_data = await manga_response.json()
                    manga_results = [{
                        'title': manga.get('title', 'Titre non disponible'),
                        'type': manga.get('type', 'Type non disponible'),
                        'image_url': manga['images']['jpg']['image_url'],
                        'synopsis': manga.get('synopsis', 'Synopsis non disponible')[:200]
                    } for manga in manga_data.get('data', [])[:limit] if limit]
                else:
                    manga_results = []

            return anime_results, manga_results

# Vue pour effectuer une recherche avec mise en cache
@cache_page(60 * 5)  # 5 minutes de cache
def search(request):
    query = request.GET.get('q')
    if not query:
        return JsonResponse({"error": "Le paramètre 'q' est manquant dans la requête."}, status=400)

    # Vérifier le cache en premier
    cache_key = f"search_{query}"
    cached_results = cache.get(cache_key)
    if cached_results:
        return JsonResponse(cached_results)

    # Obtenir les paramètres optionnels
    limit = int(request.GET.get('limit', 0))
    include_streaming = request.GET.get('include_streaming', '').lower() == 'true'

    try:
        # Exécuter la recherche asynchrone dans un pool de threads
        loop = asyncio.new_event_loop()
        anime_results, manga_results = loop.run_until_complete(
            async_search(query, include_streaming, limit)
        )
        loop.close()

        results = {
            'anime_results': anime_results,
            'manga_results': manga_results
        }

        # Mettre en cache les résultats
        cache.set(cache_key, results, timeout=300)

        return JsonResponse(results)

    except Exception as e:
        return JsonResponse({
            "error": "Une erreur est survenue lors de la recherche.",
            "details": str(e)
        }, status=500)

