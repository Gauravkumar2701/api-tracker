# api/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import APIHit
from .serializers import APIHitSerializer
from django.utils import timezone

@api_view(['POST'])
def record_api_hit(request):
   
    return Response({"message": "API hit recorded"}, status=201)
    
@api_view(['GET'])
def get_api_hits(request):
    hits = APIHit.objects.all()
    serializer = APIHitSerializer(hits, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_users(request):
    users = {
        "users" : ["Gaurav", "Gaurav", "Gaurav","Gaurav","Gaurav"]
    }
    return Response(users)
