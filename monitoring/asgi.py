# import os
# import django
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from django.core.asgi import get_asgi_application
#
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "monitoring.settings")
# django.setup()   # make sure apps are loaded before importing routing
#
# import monitoringapp.routing  # now it's safe to import
#
# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket": AuthMiddlewareStack(
#         URLRouter(
#             monitoringapp.routing.websocket_urlpatterns
#         )
#     ),
# })

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import monitoringapp.routing  # ✅ use your app

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "monitoring.settings")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            monitoringapp.routing.websocket_urlpatterns
        )
    ),
})






