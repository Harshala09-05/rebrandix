import graphene
from graphene_django.types import DjangoObjectType
from .models import ChatRoom, Message
from django.contrib.auth import get_user_model
User = get_user_model()

class UserType(DjangoObjectType):
    class Meta:
        model = User

class ChatRoomType(DjangoObjectType):
    class Meta:
        model = ChatRoom

class MessageType(DjangoObjectType):
    class Meta:
        model = Message


class CreateChatRoom(graphene.Mutation):
    room = graphene.Field(ChatRoomType)

    class Arguments:
        user_id = graphene.Int()

    def mutate(self, info, user_id):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required")

        other_user = User.objects.get(id=user_id)

        room, created = ChatRoom.objects.get_or_create(
            user1=min(user, other_user, key=lambda u: u.id),
            user2=max(user, other_user, key=lambda u: u.id)
        )
        return CreateChatRoom(room=room)


class SendMessage(graphene.Mutation):
    message = graphene.Field(MessageType)

    class Arguments:
        room_id = graphene.Int()
        content = graphene.String()

    def mutate(self, info, room_id, content):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required")

        room = ChatRoom.objects.get(id=room_id)
        message = Message.objects.create(room=room, sender=user, content=content)
        return SendMessage(message=message)
    
    
class Query(graphene.ObjectType):
    chat_rooms = graphene.List(ChatRoomType)
    messages = graphene.List(MessageType, room_id=graphene.Int())

    def resolve_chat_rooms(self, info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication required")
        return ChatRoom.objects.filter(user1=user) | ChatRoom.objects.filter(user2=user)

    def resolve_messages(self, info, room_id):
        return Message.objects.filter(room_id=room_id).order_by('timestamp')
    

class Mutation(graphene.ObjectType):
    create_chat_room = CreateChatRoom.Field()
    send_message = SendMessage.Field()
