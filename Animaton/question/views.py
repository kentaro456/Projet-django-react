from django.http import JsonResponse
import json
from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from .serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class ReactView(APIView):
    def get(self, request):
        # Récupération des données des deux modèles
        questions = [
            {
                "id": question.id,
                "phrase": question.phrase,
                "id_reponce": question.id_reponce,
            }
            for question in Question.objects.all()
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
            "questions": questions,
            "reponses": reponses,
        }

        return Response(output)


def index(request) :

    context ={
        "questions": Question.objects.all(),
        "reponses": Reponce.objects.all(),
    }

    return render(request, "questions/index.html", context)





def import_data(request):
    # Structure JSON que vous souhaitez insérer
    data = {
        "questions": [
            {"id": 2, "phrase": "Dans Naruto, quel est le nom du démon scellé en Naruto ?", "id_reponce": 3},
            {"id": 3, "phrase": "Dans One Piece, quel est le rêve de Monkey D. Luffy ?", "id_reponce": 7},
            {"id": 4, "phrase": "Dans Death Note, quel est le véritable nom de L ?", "id_reponce": 11},
            {"id": 5, "phrase": "Dans Demon Slayer, quel est le nom de la sœur de Tanjiro ?", "id_reponce": 15},
            {"id": 6, "phrase": "Dans Attack on Titan, qui est le Titan Assaillant ?", "id_reponce": 19},
            {"id": 7, "phrase": "Dans Dragon Ball Z, combien de Dragon Balls faut-il pour invoquer Shenron ?", "id_reponce": 23},
            {"id": 8, "phrase": "Dans My Hero Academia, quel est le Alter de Katsuki Bakugo ?", "id_reponce": 27},
            {"id": 9, "phrase": "Dans Hunter x Hunter, quel est le nom de l’arme principale de Killua ?", "id_reponce": 31},
            {"id": 10, "phrase": "Dans Fullmetal Alchemist: Brotherhood, quelle est la loi principale de l’alchimie ?", "id_reponce": 35},
            {"id": 11, "phrase": "Dans Tokyo Ghoul, quelle est la couleur des yeux d’un Ghoul en activité ?", "id_reponce": 39}
        ],
        "reponses": [
            {"id": 3, "mot": "Kurama"},
            {"id": 4, "mot": "Shukaku"},
            {"id": 5, "mot": "Gyūki"},
            {"id": 6, "mot": "Susano'o"},
            {"id": 7, "mot": "Devenir le Roi des Pirates"},
            {"id": 8, "mot": "Trouver le trésor de Shanks"},
            {"id": 9, "mot": "Explorer tous les océans"},
            {"id": 10, "mot": "Sauver la mer d'East Blue"},
            {"id": 11, "mot": "L Lawliet"},
            {"id": 12, "mot": "Ryuuzaki Akira"},
            {"id": 13, "mot": "Kira Hideki"},
            {"id": 14, "mot": "Yagami Light"},
            {"id": 15, "mot": "Nezuko Kamado"},
            {"id": 16, "mot": "Kanao Tsuyuri"},
            {"id": 17, "mot": "Shinobu Kocho"},
            {"id": 18, "mot": "Mitsuri Kanroji"},
            {"id": 19, "mot": "Eren Yeager"},
            {"id": 20, "mot": "Levi Ackerman"},
            {"id": 21, "mot": "Zeke Yeager"},
            {"id": 22, "mot": "Mikasa Ackerman"},
            {"id": 23, "mot": "7"},
            {"id": 24, "mot": "6"},
            {"id": 25, "mot": "8"},
            {"id": 26, "mot": "10"},
            {"id": 27, "mot": "Explosion"},
            {"id": 28, "mot": "Combustion"},
            {"id": 29, "mot": "Pyrokinésie"},
            {"id": 30, "mot": "Vague de choc"},
            {"id": 31, "mot": "Yo-yos en acier"},
            {"id": 32, "mot": "Épée cachée"},
            {"id": 33, "mot": "Griffes électriques"},
            {"id": 34, "mot": "Chakrams"},
            {"id": 35, "mot": "L'échange équivalent"},
            {"id": 36, "mot": "Le cercle parfait"},
            {"id": 37, "mot": "La transmutation interdite"},
            {"id": 38, "mot": "La théorie d'Homunculus"},
            {"id": 39, "mot": "Rouge avec une pupille noire"},
            {"id": 40, "mot": "Blanc avec une pupille rouge"},
            {"id": 41, "mot": "Noir avec une pupille blanche"},
            {"id": 42, "mot": "Bleu avec des veines visibles"}
        ]
    }

    # Insertion des réponses
    for reponse_data in data['reponses']:
        Reponce.objects.create(id=reponse_data['id'], mot=reponse_data['mot'])

    # Insertion des questions
    for question_data in data['questions']:
        Question.objects.create(id=question_data['id'], phrase=question_data['phrase'], id_reponce=question_data['id_reponce'])

    return JsonResponse({"status": "success", "message": "Data successfully imported."})

