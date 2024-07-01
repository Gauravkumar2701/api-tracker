# api/urls.py

from django.urls import path
from .views import record_api_hit, get_api_hits, get_all_users

urlpatterns = [
    path('hit/', record_api_hit),
    path('info/', get_api_hits),
    path('get-user/', get_all_users)

]
