from django.db import models

# Create your models here.
class Reponce(models.Model):
    mot = models.CharField(max_length=255)

    def __str__(self):
        return f"id : {self.id} - reponce :{self.mot}"


class Music(models.Model):
    music = models.FileField(upload_to='musics/')
    id_reponce = models.IntegerField()  # Référence à la réponse

    def __str__(self):
        return f"id: {self.id} - Music: {self.music} - id_reponce: {self.id_reponce}"