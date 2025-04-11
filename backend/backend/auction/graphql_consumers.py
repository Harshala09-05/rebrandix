# 
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class AuctionGraphqlWsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({
            "message": "WebSocket connected successfully."
        }))

    async def disconnect(self, close_code):
        print(f"Disconnected with code {close_code}")

    async def receive(self, text_data):
        data = json.loads(text_data)
        # Example handling - replace with your GraphQL logic if needed
        response = {
            "received": data
        }
        await self.send(text_data=json.dumps(response))
