from django.urls import include, path
from Backend import views
from django.contrib import admin
from musique import views as musique_views
from question import views as question_views
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, QuestionViewSet, OptionViewSet, TournamentViewSet, RoundViewSet, MatchViewSet, VoteViewSet



# Créer un routeur pour l'API
router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'options', OptionViewSet)
router.register(r'tournaments', TournamentViewSet)
router.register(r'rounds', RoundViewSet)
router.register(r'matches', MatchViewSet)
router.register(r'votes', VoteViewSet)

urlpatterns = [
    path('import_data_music/', musique_views.import_data, name="import_data_music" ),
    path('music/', musique_views.ReactView.as_view(), name="music"),
    path('question/', question_views.ReactView.as_view(), name="question"),
    path('import_data_question/', question_views.import_data, name='import_data_question'),
    path('i/',views.index, name = 'index'),
    
    path('api/top-anime/', views.top_anime_view, name='top_anime_view'),
    path('api/top/manga/', views.top_manga_view, name='top_manga'),
    path('api/top/characters/', views.top_characters_view, name='top_characters'),
    path('api/recommendations/anime/', views.recommendations_anime_view, name='recommendations_anime'),
    path('api/recherche/', views.search, name='search'),
    path('api/schedule/', views.get_schedule, name='get_schedule'),
    path('api/', include(router.urls)),
]
