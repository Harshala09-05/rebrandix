"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os

# from django.core.asgi import get_asgi_application


# application = get_asgi_application()
import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from chat_app.routing import websocket_urlpatterns as chat_app
from auction.routing import websocket_urlpatterns as auction

combination_websocket_urlpatterns = chat_app + auction

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'yourproject.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(combination_websocket_urlpatterns)
    ),
})
