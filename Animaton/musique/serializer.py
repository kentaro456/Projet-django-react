from rest_framework import serializers
from .models import *

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reponce
        fields = ['id', 'mot']
        model = Music
        fields = ['id', 'music', 'id_reponce']