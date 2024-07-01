from rest_framework import serializers
from .models import APIHit

class APIHitSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIHit
        fields = '__all__'