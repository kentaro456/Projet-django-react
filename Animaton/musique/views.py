from django.http import JsonResponse
import json
from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from .serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response


class ReactView(APIView):
    def get(self, request):
        # Récupération des données des deux modèles
        musics = [
            {
                "id": music.id,
                "music": music.music.url if music.music else None,  # Utilisez le chemin du fichier
                "id_reponce": music.id_reponce,
            }
            for music in Music.objects.all()
        ]

        reponses = [
            {
                "id": reponse.id,
                "mot": reponse.mot,
            }
            for reponse in Reponce.objects.all()
        ]

        # Fusion des données
        output = {
            "musics": musics,
            "reponses": reponses,
        }

        return Response(output)


def musicApi(request):
    return ReactView.as_view()

def import_data(request):
    data = {
            # Liste des OSTs avec leurs IDs et noms
        "reponces": [
            {"id": 1, "mot": "DAN DAN Kokoro Hikareteku"},  # Dragon Ball GT
            {"id": 2, "mot": "Hitori Janai"},               # Dragon Ball GT
            {"id": 3, "mot": "Blue Velvet"},                # Dragon Ball GT
            {"id": 4, "mot": "Sabitsuita Machine Gun De "}, # Dragon Ball GT

            {"id": 5, "mot": "Gamushara"},                  # Naruto Shippuden
            {"id": 6, "mot": "Sign"},                       # Naruto Shippuden
            {"id": 7, "mot": "Blue Bird"},                  # Naruto Shippuden
            {"id": 8, "mot": "Silhouette"},                 # Naruto Shippuden

            {"id": 9, "mot": "One"},                        # One Piece
            {"id": 10, "mot": "We Are!"},                   # One Piece
            {"id": 11, "mot": "Believe"},                   # One Piece
            {"id": 12, "mot": "Share The World"},           # One Piece

            {"id": 13, "mot": "Tomo Yo Koko De Sayonara Da"},  # My Hero Academia
            {"id": 14, "mot": "Peace Sign"},                   # My Hero Academia
            {"id": 15, "mot": "Make My Story"},                # My Hero Academia
            {"id": 16, "mot": "The Day"},                      # My Hero Academia
            
            {"id": 17, "mot": "Rally Go Round"},                # Aldnoah.Zero
            {"id": 18, "mot": "A/Z"},                           # Aldnoah.Zero
            {"id": 19, "mot": "Heavenly Blue"},                 # Aldnoah.Zero
            {"id": 20, "mot": "Alchemist of Atlas"},            # Aldnoah.Zero
            
            {"id": 21, "mot": "Kawaki Wo Ameku"},               # Domestic Girlfriend
            {"id": 22, "mot": "Wagamama"},                      # Domestic Girlfriend
            {"id": 23, "mot": "Cry Hero Cry"},                  # Domestic Girlfriend
            {"id": 24, "mot": "Glass Love"},                    # Domestic Girlfriend
            
            {"id": 25, "mot": "Hikaru Nara"},                   # Your Lie in April
            {"id": 26, "mot": "Kirameki"},                      # Your Lie in April
            {"id": 27, "mot": "Orange"},                        # Your Lie in April
            {"id": 28, "mot": "Friend A"},                      # Your Lie in April
            
            {"id": 29, "mot": "I Will"},                        # Blue Spring Ride
            {"id": 30, "mot": "Sekai wa Koi ni Ochiteiru"},     # Blue Spring Ride
            {"id": 31, "mot": "Blue"},                          # Blue Spring Ride
            {"id": 32, "mot": "Unspoken Words"},                # Blue Spring Ride
        ], 
        "musics": [
            {
                "id": 1,
                "music": "musics/DAN_DAN_Kokoro_Hikareteku.mp3",  # Dragon Ball GT
                "id_reponce": 1,  # Groupe lié à Dragon Ball GT
            },
            {
                "id": 2,
                "music": "musics/Gamushara.mp3",  # Naruto Shippuden
                "id_reponce": 5,  # Groupe lié à Naruto Shippuden
            },
            {
                "id": 3,
                "music": "musics/One.mp3",  # One Piece
                "id_reponce": 9,  # Groupe lié à One Piece
            },
            {
                "id": 4,
                "music": "musics/Tomo_Yo_Koko_De_Sayonara_Da.mp3",  # My Hero Academia
                "id_reponce": 13,  # Groupe lié à My Hero Academia
            },
            {
                "id": 5,
                "music": "musics/Rally_Go_Round.mp3",
                "id_reponce": 17,
            },
            {
                "id": 6,
                "music": "musics/Kawaki_Wo_Ameku.mp3",
                "id_reponce": 21,
            },
            {
                "id": 7,
                "music": "musics/Hikaru_Nara.mp3",
                "id_reponce": 25,
            },
            {
                "id": 8,
                "music": "musics/I_Will.mp3",
                "id_reponce": 29,
            },
        ]

    }
    # Insertion des OSTs dans la base de données
    for ost in data['reponces']:
        Reponce.objects.create(id=ost["id"], mot=ost["mot"])
    for music in data['musics']:
        Music.objects.create(id=music["id"], music=music["music"], id_reponce=music["id_reponce"])

        
    return JsonResponse({"status": "success", "message": "Data successfully imported."})