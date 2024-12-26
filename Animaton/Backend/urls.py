from django.urls import path
from Backend import views

urlpatterns = [
    path('',views.index, name = 'index'),
    
    path('api/top-anime/', views.top_anime_view, name='top_anime_view'),
    path('api/top/manga/', views.top_manga_view, name='top_manga'),
    path('api/top/characters/', views.top_characters_view, name='top_characters'),
    path('api/recommendations/anime/', views.recommendations_anime_view, name='recommendations_anime'),
    path('api/recherche/', views.search, name='search'),
    path('api/schedule/', views.get_schedule, name='get_schedule'),
]
