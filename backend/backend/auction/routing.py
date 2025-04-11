from django.urls import re_path
from .graphql_consumers import AuctionGraphqlWsConsumer

websocket_urlpatterns = [
    re_path("ws/auction/", AuctionGraphqlWsConsumer.as_asgi()),
]


