# api/models.py

from django.db import models

class APIHit(models.Model):
    request_id = models.AutoField(primary_key=True)
    request_path=models.CharField(max_length=100, blank=True)
    request_type = models.CharField(max_length=10)
    request_time = models.DateTimeField(auto_now_add=True)
    payload = models.TextField(null=True, blank=True)
    content_type = models.CharField(max_length=100, null=True, blank=True)
    ip_address = models.CharField(max_length=50)
    os = models.CharField(max_length=100)
    user_agent = models.CharField(max_length=255)

    def __str__(self):
        return self.request_id
