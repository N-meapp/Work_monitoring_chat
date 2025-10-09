import os
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
import monitoringapp.routing  # only import routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'monitoring.settings')

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
    'http': django_asgi_app,
    'websocket': AuthMiddlewareStack(
        URLRouter(
            monitoringapp.routing.websocket_urlpatterns
        )
    ),
})
