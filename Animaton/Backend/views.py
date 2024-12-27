from functools import cache  # Importation du décorateur de cache pour la mise en cache des fonctions
from warnings import filters  # Importation des filtres de warnings (non utilisé dans ce code)
from django.shortcuts import render  # Importation de la fonction render pour rendre les templates
import requests  # Importation de la bibliothèque requests pour effectuer des requêtes HTTP
from rest_framework.views import APIView  # Importation de la classe APIView pour créer des vues API
from rest_framework.response import Response  # Importation de la classe Response pour renvoyer des réponses API
from rest_framework import status  # Importation des statuts HTTP pour les réponses API
from django.http import JsonResponse  # Importation de la classe JsonResponse pour renvoyer des réponses JSON
from django.views.decorators.cache import cache_page  # Importation du décorateur cache_page pour la mise en cache des vues
from django.core.cache import cache  # Importation de l'objet cache pour interagir avec le cache
import asyncio  # Importation de la bibliothèque asyncio pour la programmation asynchrone
import aiohttp  # Importation de la bibliothèque aiohttp pour effectuer des requêtes HTTP asynchrones
from functools import partial  # Importation de la fonction partial pour créer des fonctions partielles
import concurrent.futures  # Importation de la bibliothèque concurrent.futures pour l'exécution concurrente

# Vue principale pour rendre la page d'accueil
def index(request):
    # Créer un contexte avec des données que vous souhaitez passer au modèle
    context = {}

    # Rendre le modèle avec le contexte
    return render(request, "index.html", context)

# Fonction pour récupérer les meilleurs animes
@cache_page(60 * 10)  # Mise en cache de la page pour 10 minutes
def get_top_anime(request):
    url = "https://api.jikan.moe/v4/top/anime"  # URL de l'API pour récupérer les meilleurs animes
    response = requests.get(url)  # Effectuer une requête GET à l'URL

    if response.status_code == 200:  # Vérifier si la requête a réussi
        top_anime = response.json()  # Convertir la réponse en JSON
        return JsonResponse(top_anime, safe=False)  # Renvoyer la réponse JSON
    else:
        print("Erreur lors de la récupération du top anime:", response.status_code)  # Afficher un message d'erreur
        return JsonResponse({"error": "Failed to fetch top anime"}, status=500)  # Renvoyer une réponse d'erreur

# Vue pour afficher les meilleurs animes
@cache_page(60 * 10)  # Mise en cache de la page pour 10 minutes
def top_anime_view(request):
    return get_top_anime(request)  # Appeler la fonction get_top_anime et renvoyer le résultat

# Fonction pour récupérer les meilleurs mangas
@cache_page(60 * 10)  # Mise en cache de la page pour 10 minutes
def get_top_manga(request):
    url = "https://api.jikan.moe/v4/top/manga"  # URL de l'API pour récupérer les meilleurs mangas
    response = requests.get(url)  # Effectuer une requête GET à l'URL

    if response.status_code == 200:  # Vérifier si la requête a réussi
        top_manga = response.json()  # Convertir la réponse en JSON
        return JsonResponse(top_manga, safe=False)  # Renvoyer la réponse JSON
    else:
        print("Erreur lors de la récupération du top manga:", response.status_code)  # Afficher un message d'erreur
        return JsonResponse({"error": "Failed to fetch top manga"}, status=500)  # Renvoyer une réponse d'erreur

# Fonction pour récupérer les meilleurs personnages
@cache_page(60 * 10)  # Mise en cache de la page pour 10 minutes
def get_top_characters(request):
    url = "https://api.jikan.moe/v4/top/characters"  # URL de l'API pour récupérer les meilleurs personnages
    response = requests.get(url)  # Effectuer une requête GET à l'URL

    if response.status_code == 200:  # Vérifier si la requête a réussi
        top_characters = response.json()  # Convertir la réponse en JSON
        return JsonResponse(top_characters, safe=False)  # Renvoyer la réponse JSON
    else:
        print("Erreur lors de la récupération du top characters:", response.status_code)  # Afficher un message d'erreur
        return JsonResponse({"error": "Failed to fetch top characters"}, status=500)  # Renvoyer une réponse d'erreur

# Fonction pour récupérer les recommandations d'anime
@cache_page(60 * 10)  # Mise en cache de la page pour 10 minutes
def get_recommendations_anime(request):
    url = "https://api.jikan.moe/v4/recommendations/anime"  # URL de l'API pour récupérer les recommandations d'anime
    response = requests.get(url)  # Effectuer une requête GET à l'URL

    if response.status_code == 200:  # Vérifier si la requête a réussi
        recommendations = response.json()  # Convertir la réponse en JSON
        return JsonResponse(recommendations, safe=False)  # Renvoyer la réponse JSON
    else:
        print("Erreur lors de la récupération des recommendations anime:", response.status_code)  # Afficher un message d'erreur
        return JsonResponse({"error": "Failed to fetch recommendations anime"}, status=500)  # Renvoyer une réponse d'erreur

# Fonction pour récupérer l'horaire des animes
@cache_page(60 * 5)  # Mise en cache de la page pour 5 minutes
def get_schedule(request):
    url = "https://api.jikan.moe/v4/schedules"  # URL de l'API pour récupérer l'horaire des animes
    response = requests.get(url)  # Effectuer une requête GET à l'URL

    if response.status_code == 200:  # Vérifier si la requête a réussi
        schedule = response.json()  # Convertir la réponse en JSON
        return JsonResponse(schedule, safe=False)  # Renvoyer la réponse JSON
    else:
        print("Erreur lors de la récupération de l'horaire des animes:", response.status_code)  # Afficher un message d'erreur
        return JsonResponse({"error": "Failed to fetch anime schedule"}, status=500)  # Renvoyer une réponse d'erreur

# Vue pour afficher l'horaire des animes
@cache_page(60 * 10)  # Mise en cache de la page pour 10 minutes
def schedule(request):
    return get_schedule(request)  # Appeler la fonction get_schedule et renvoyer le résultat

# Vue pour afficher les meilleurs mangas
@cache_page(60 * 10)  # Mise en cache de la page pour 10 minutes
def top_manga_view(request):
    return get_top_manga(request)  # Appeler la fonction get_top_manga et renvoyer le résultat

# Vue pour afficher les meilleurs personnages
@cache_page(60 * 10)  # Mise en cache de la page pour 10 minutes
def top_characters_view(request):
    return get_top_characters(request)  # Appeler la fonction get_top_characters et renvoyer le résultat

# Vue pour afficher les recommandations d'anime
@cache_page(60 * 10)  # Mise en cache de la page pour 10 minutes
def recommendations_anime_view(request):
    return get_recommendations_anime(request)  # Appeler la fonction get_recommendations_anime et renvoyer le résultat

# Fonction asynchrone pour récupérer les données de streaming
async def fetch_streaming_data(session, anime_id):
    """Récupérer les données de streaming de manière asynchrone"""
    url = f"https://api.jikan.moe/v4/anime/{anime_id}/streaming"  # URL de l'API pour récupérer les données de streaming
    try:
        async with session.get(url) as response:  # Effectuer une requête GET asynchrone
            if response.status == 200:  # Vérifier si la requête a réussi
                data = await response.json()  # Convertir la réponse en JSON
                return data.get('data', [])  # Renvoyer les données de streaming
    except Exception:
        return []  # Renvoyer une liste vide en cas d'erreur
    return []  # Renvoyer une liste vide en cas d'erreur

# Fonction asynchrone pour traiter les détails individuels des animes
async def fetch_anime_details(session, anime):
    """Traitement des détails individuels des animes de manière asynchrone"""
    anime_info = {
        'id': anime.get('mal_id'),  # ID de l'anime
        'title': anime.get('title', 'Titre non disponible'),  # Titre de l'anime
        'type': anime.get('type', 'Type non disponible'),  # Type de l'anime
        'status': anime.get('status', 'Statut non disponible'),  # Statut de l'anime
        'episodes': anime.get('episodes', 'Non disponible'),  # Nombre d'épisodes
        'synopsis': anime.get('synopsis', 'Synopsis non disponible'),  # Synopsis de l'anime
        'image_url': anime['images'].get('jpg', {}).get('image_url', ''),  # URL de l'image
        'streaming': []  # Données de streaming
    }

    # Récupérer les données de streaming uniquement si spécifiquement demandé
    if 'include_streaming' in session.extra_info:
        streaming_data = await fetch_streaming_data(session, anime_info['id'])  # Appeler la fonction fetch_streaming_data
        anime_info['streaming'] = streaming_data  # Ajouter les données de streaming à anime_info

    return anime_info  # Renvoyer les informations de l'anime

# Fonction asynchrone pour effectuer une recherche
async def async_search(query, include_streaming=False, limit=None):
    """Effectuer une recherche asynchrone"""
    async with aiohttp.ClientSession() as session:  # Créer une session aiohttp
        session.extra_info = {'include_streaming': include_streaming}  # Ajouter des informations supplémentaires à la session

        # Récupérer les résultats des animes
        anime_url = f"https://api.jikan.moe/v4/anime?q={query}&sfw"  # URL de l'API pour rechercher des animes
        async with session.get(anime_url) as response:  # Effectuer une requête GET asynchrone
            if response.status != 200:  # Vérifier si la requête a échoué
                return [], []  # Renvoyer des listes vides

            anime_data = await response.json()  # Convertir la réponse en JSON
            anime_list = anime_data.get('data', [])  # Récupérer la liste des animes

            if limit:  # Si une limite est spécifiée
                anime_list = anime_list[:limit]  # Limiter la liste des animes

            # Traiter les détails des animes de manière concurrente
            tasks = [fetch_anime_details(session, anime) for anime in anime_list]  # Créer des tâches pour chaque anime
            anime_results = await asyncio.gather(*tasks)  # Exécuter les tâches de manière concurrente

            # Récupérer les résultats des mangas si nécessaire (simplifié pour la performance)
            manga_url = f"https://api.jikan.moe/v4/manga?q={query}&sfw"  # URL de l'API pour rechercher des mangas
            async with session.get(manga_url) as manga_response:  # Effectuer une requête GET asynchrone
                if manga_response.status == 200:  # Vérifier si la requête a réussi
                    manga_data = await manga_response.json()  # Convertir la réponse en JSON
                    manga_results = [{
                        'title': manga.get('title', 'Titre non disponible'),  # Titre du manga
                        'type': manga.get('type', 'Type non disponible'),  # Type du manga
                        'image_url': manga['images']['jpg']['image_url'],  # URL de l'image
                        'synopsis': manga.get('synopsis', 'Synopsis non disponible')[:200]  # Synopsis du manga
                    } for manga in manga_data.get('data', [])[:limit] if limit]  # Récupérer les informations des mangas
                else:
                    manga_results = []  # Renvoyer une liste vide en cas d'erreur

            return anime_results, manga_results  # Renvoyer les résultats des animes et des mangas

# Vue pour effectuer une recherche avec mise en cache
@cache_page(60 * 10)  # Mise en cache de la page pour 10 minutes
def search(request):
    query = request.GET.get('q')  # Récupérer le paramètre de requête 'q'
    if not query:  # Vérifier si le paramètre 'q' est manquant
        return JsonResponse({"error": "Le paramètre 'q' est manquant dans la requête."}, status=400)  # Renvoyer une réponse d'erreur

    # Vérifier le cache en premier
    cache_key = f"search_{query}"  # Clé de cache pour la requête
    cached_results = cache.get(cache_key)  # Récupérer les résultats mis en cache
    if cached_results:  # Si des résultats sont trouvés dans le cache
        return JsonResponse(cached_results)  # Renvoyer les résultats mis en cache

    # Obtenir les paramètres optionnels
    limit = int(request.GET.get('limit', 0))  # Récupérer le paramètre de requête 'limit'
    include_streaming = request.GET.get('include_streaming', '').lower() == 'true'  # Récupérer le paramètre de requête 'include_streaming'

    try:
        # Exécuter la recherche asynchrone dans un pool de threads
        loop = asyncio.new_event_loop()  # Créer une nouvelle boucle d'événements
        anime_results, manga_results = loop.run_until_complete(
            async_search(query, include_streaming, limit)  # Appeler la fonction async_search
        )
        loop.close()  # Fermer la boucle d'événements

        results = {
            'anime_results': anime_results,  # Résultats des animes
            'manga_results': manga_results  # Résultats des mangas
        }

        # Mettre en cache les résultats
        cache.set(cache_key, results, timeout=300)  # Mettre en cache les résultats pour 5 minutes

        return JsonResponse(results)  # Renvoyer les résultats

    except Exception as e:
        return JsonResponse({
            "error": "Une erreur est survenue lors de la recherche.",  # Message d'erreur
            "details": str(e)  # Détails de l'erreur
        }, status=500)  # Renvoyer une réponse d'erreur

"""
partie api perso pour le tournoie

"""
from rest_framework import viewsets  # Importation de la classe viewsets pour créer des ensembles de vues
from rest_framework.response import Response  # Importation de la classe Response pour renvoyer des réponses API
from .models import Category, Question, Option, Tournament, Round, Match, Vote  # Importation des modèles
from .serializers import CategorySerializer, QuestionSerializer, OptionSerializer, TournamentSerializer, RoundSerializer, MatchSerializer, VoteSerializer  # Importation des sérialiseurs

# ViewSet pour les Catégories
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()  # Définir le queryset pour toutes les catégories
    serializer_class = CategorySerializer  # Définir le sérialiseur pour les catégories

# ViewSet pour les Questions
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()  # Définir le queryset pour toutes les questions
    serializer_class = QuestionSerializer  # Définir le sérialiseur pour les questions

    def get_queryset(self):
        queryset = super().get_queryset()  # Appeler la méthode get_queryset de la classe parente
        category_id = self.request.query_params.get('category', None)  # Récupérer le paramètre de requête 'category'

        # Si 'category' est passé en paramètre, filtrer par category_id
        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)  # Filtrer les questions par category_id

        return queryset  # Renvoyer le queryset filtré

# ViewSet pour les Options
class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()  # Définir le queryset pour toutes les options
    serializer_class = OptionSerializer  # Définir le sérialiseur pour les options

    def get_queryset(self):
        queryset = super().get_queryset()  # Appeler la méthode get_queryset de la classe parente
        question_id = self.request.query_params.get('question', None)  # Récupérer le paramètre de requête 'question'

        # Si 'question' est passé en paramètre, filtrer par question_id
        if question_id is not None:
            queryset = queryset.filter(question_id=question_id)  # Filtrer les options par question_id

        return queryset  # Renvoyer le queryset filtré

# ViewSet pour les Tournois
class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()  # Définir le queryset pour tous les tournois
    serializer_class = TournamentSerializer  # Définir le sérialiseur pour les tournois

    def create(self, request, *args, **kwargs):
        # Ajouter une logique personnalisée si nécessaire
        return super().create(request, *args, **kwargs)  # Appeler la méthode create de la classe parente

# ViewSet pour les Rounds
class RoundViewSet(viewsets.ModelViewSet):
    queryset = Round.objects.all()  # Définir le queryset pour tous les rounds
    serializer_class = RoundSerializer  # Définir le sérialiseur pour les rounds

# ViewSet pour les Matchs
class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()  # Définir le queryset pour tous les matchs
    serializer_class = MatchSerializer  # Définir le sérialiseur pour les matchs

# ViewSet pour les Votes
class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()  # Définir le queryset pour tous les votes
    serializer_class = VoteSerializer  # Définir le sérialiseur pour les votes

    def create(self, request, *args, **kwargs):
        match_id = request.data.get("match")  # Récupérer le match_id du corps de la requête
        option_id = request.data.get("option")  # Récupérer l'option_id du corps de la requête

        # Vérifier si un vote a déjà été effectué pour ce match par cet utilisateur
        if Vote.objects.filter(match_id=match_id, user=request.user).exists():
            return Response({"detail": "Vous avez déjà voté pour ce match."}, status=400)  # Renvoyer une réponse d'erreur

        # Créer le vote
        return super().create(request, *args, **kwargs)  # Appeler la méthode create de la classe parente