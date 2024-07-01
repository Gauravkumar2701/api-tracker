# api/middleware.py

from datetime import datetime
from django.utils.deprecation import MiddlewareMixin
from .models import APIHit 
import re

class RecordAPIMiddleware(MiddlewareMixin):

    def process_request(self, request):
    
        if request.path.startswith('/api/'):
           
            user_agent = request.META.get('HTTP_USER_AGENT', '')
            ip_address = request.META.get('REMOTE_ADDR', '')
            request_info = {
                'request_path': request.path,
                'request_type': request.method,
                'request_time': datetime.now(),
                'payload': request.body.decode('utf-8') if request.body else '',
                'content_type': request.content_type or "",
                'ip_address': ip_address,
                'os': self.get_os_from_user_agent(user_agent),
                'user_agent': self.get_browser_from_user_agent(user_agent)
            }
            
            # Create a new APIHit instance and save it to the database
            APIHit.objects.create(**request_info)
        
        # Continue with the request cycle
        return None


    def get_os_from_user_agent(self, user_agent):
        # Basic extraction of OS from user agent string
        os_patterns = {
            'Windows': 'Windows',
            'Mac': 'Macintosh',
            'Linux': 'Linux',
            'Android': 'Android',
            'iPhone': 'iPhone',
            'iPad': 'iPad'
        }
        for os, pattern in os_patterns.items():
            if re.search(pattern, user_agent, re.IGNORECASE):
                return os
        return 'Unknown'

    def get_browser_from_user_agent(self, user_agent):
        # Basic extraction of browser from user agent string
        browser_patterns = {
            'Chrome': 'Chrome',
            'Firefox': 'Firefox',
            'Safari': 'Safari',
            'Edge': 'Edg',
            'Internet Explorer': 'MSIE|Trident',
            'Opera': 'Opera|OPR'
        }
        for browser, pattern in browser_patterns.items():
            if re.search(pattern, user_agent, re.IGNORECASE):
                return browser
        return 'Unknown'
