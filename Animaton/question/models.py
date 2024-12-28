from django.db import models

# Create your models here.

class Reponce(models.Model):
    mot = models.CharField(max_length=255)

    def __str__(self):
        return f"id : {self.id} - mot :{self.mot}"
    
    def getMotId(id) :
        return f""


class Question(models.Model) :
    phrase = models.CharField(max_length=255)
    id_reponce = models.IntegerField()

    def __str__(self):
        return f"id : {self.id} - phrase :{self.phrase} - id_reponce = {self.id_reponce}"

    def getphrase(self):
        return f"{self.phrase}"

    def getIdReponce(self):
        return self.id_reponce


def getRandomList():
    dernier_obj = Reponce.objects.latest('id')
    dernier_id = dernier_obj.id
    return dernier_id