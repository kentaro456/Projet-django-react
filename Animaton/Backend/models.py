from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(
        max_length=50,
        choices=[('Personnages', 'Personnages'),
                 ('Animes', 'Animes'),
                 ('Manga', 'Manga'),
                 ('Opening', 'Opening'),
                 ('Ost', 'Ost')],
    )
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.get_type_display()} - {self.name}"

class Question(models.Model):
    category = models.ForeignKey(Category, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=200)

    def __str__(self):
        return self.text

class Option(models.Model):
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    image = models.URLField(blank=True)
    description = models.TextField(blank=True)
    anime_source = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} ({self.anime_source})"

class Tournament(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
   

    def __str__(self):
        return f"{self.name} - {self.question}"

    def start(self):
        # Logique pour démarrer un tournoi
        if not self.is_active:
            self.is_active = True
            self.save()

    def end(self):
        # Logique pour terminer un tournoi
        if self.is_active:
            self.is_active = False
            self.save()

class Round(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    round_number = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ['tournament', 'round_number']

    def __str__(self):
        return f"Round {self.round_number} - Tournament {self.tournament.name}"

    def end(self):
        self.is_active = False
        self.save()

class Match(models.Model):
    round = models.ForeignKey('Round', on_delete=models.CASCADE)
    option1 = models.ForeignKey('Option', on_delete=models.CASCADE, related_name='matches_as_option1')
    option2 = models.ForeignKey('Option', on_delete=models.CASCADE, related_name='matches_as_option2')
    option1_votes = models.IntegerField(default=0)
    option2_votes = models.IntegerField(default=0)
    winner = models.ForeignKey('Option', on_delete=models.CASCADE, null=True, related_name='matches_won')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['round', 'option1', 'option2'],
                name='unique_match_per_round'
            ),
            models.UniqueConstraint(
                fields=['round', 'option2', 'option1'],
                name='unique_reverse_match_per_round'
            ),
        ]

    def __str__(self):
        return f"{self.option1.name} VS {self.option2.name}"

class Vote(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['match', 'user']
