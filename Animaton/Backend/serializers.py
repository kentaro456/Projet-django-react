from rest_framework import serializers
from .models import Category, Question, Option, Tournament, Round, Match, Vote

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'type', 'description']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text', 'category']

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'name', 'image', 'description', 'anime_source', 'question']

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['id', 'name', 'category', 'question', 'created_at', 'is_active']

class RoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Round
        fields = ['id', 'round_number', 'start_time', 'end_time', 'is_active', 'tournament']

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['id', 'round', 'option1', 'option2', 'option1_votes', 'option2_votes', 'winner']

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['id', 'match', 'user', 'option', 'created_at']
