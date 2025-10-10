from django.urls import re_path
from .consumers import ChatConsumer,GroupChatConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_id>\d+)/$', ChatConsumer.as_asgi()),
    re_path(r'ws/chat/group/(?P<group_id>\d+)/$', GroupChatConsumer.as_asgi())

]
