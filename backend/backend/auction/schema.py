import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from .models import AuctionRoom, Bid, AuctionParticipant
from django.contrib.auth import get_user_model
User = get_user_model()
from dashboard.models import Product
from django.utils import timezone
from blockchain.block import Blockchain
from .subscriptions import NewBidSubscription

# blockchain = Blockchain()

# class BidType(DjangoObjectType):
#     class Meta:
#         model = Bid

# class AuctionRoomType(DjangoObjectType):
#     bid_history = graphene.List(BidType)

#     class Meta:
#         model = AuctionRoom

#     def resolve_bid_history(self, info):
#         return self.bids.all()

# class JoinAuctionRoom(graphene.Mutation):
#     class Arguments:
#         auction_room_id = graphene.ID(required=True)

#     success = graphene.Boolean()

#     def mutate(self, info, auction_room_id):
#         user = info.context.user
#         room = AuctionRoom.objects.get(id=auction_room_id)

#         if room.auction_type == 'brand_only' and user.role != 'brand':
#             raise Exception("Only brand users can join this room.")
#         elif room.auction_type == 'wholesaler_only' and user.role != 'wholesaler':
#             raise Exception("Only wholesaler users can join this room.")

#         AuctionParticipant.objects.get_or_create(auction_room=room, user=user)
#         return JoinAuctionRoom(success=True)
    
    
# class PlaceBid(graphene.Mutation):
#     class Arguments:
#         auction_room_id = graphene.ID(required=True)
#         amount = graphene.Float(required=True)

#     bid = graphene.Field(BidType)

#     def mutate(self, info, auction_room_id, amount):
#         user = info.context.user
#         if user.is_anonymous:
#             raise GraphQLError("Authentication required.")

#         try:
#             room = AuctionRoom.objects.get(id=auction_room_id)
#         except AuctionRoom.DoesNotExist:
#             raise GraphQLError("Auction room not found.")

#         # Check if user has joined the auction room
#         if not AuctionParticipant.objects.filter(auction_room=room, user=user).exists():
#             raise GraphQLError("You must join the auction room before placing a bid.")

#         now = timezone.now()
#         if now < room.start_time:
#             raise GraphQLError("Auction has not started yet.")
#         if now > room.end_time:
#             raise GraphQLError("Auction has already ended.")

#         last_bid = room.bids.first()
#         min_required = last_bid.amount if last_bid else room.base_price

#         if amount <= min_required:
#             raise GraphQLError(f"Your bid must be greater than {min_required:.2f}.")

#         # Save bid to database
#         bid = Bid.objects.create(auction_room=room, bidder=user, amount=amount)

#         # Update auction room's current price
#         if amount > room.current_price:
#             room.current_price = amount
#             room.save()

#         # Add bid to blockchain
#         blockchain.add_block({
#             'auction_id': auction_room_id,
#             'bid_id': bid.id,
#             'bidder_id': user.id,
#             'amount': amount,
#             'timestamp': str(bid.timestamp),
#         })

#         # Notify all subscribers
#         NewBidSubscription.notify_new_bid(bid)

#         return PlaceBid(bid=bid)


# class CreateAuctionRoom(graphene.Mutation):
#     auction = graphene.Field(AuctionRoomType)

#     class Arguments:
#         product_id = graphene.ID(required=True)
#         base_price = graphene.Float(required=True)
#         start_time = graphene.DateTime(required=True)
#         end_time = graphene.DateTime(required=True)

#     def mutate(self, info, product_id, base_price, start_time, end_time):
#         user = info.context.user
#         if user.is_anonymous:
#             raise GraphQLError("You must be logged in.")

#         try:
#             product = Product.objects.get(id=product_id, owner=user)
#         except Product.DoesNotExist:
#             raise GraphQLError("Invalid product or permission denied.")

#         if AuctionRoom.objects.filter(product=product).exists():
#             raise GraphQLError("Auction already exists for this product.")

#         auction = AuctionRoom.objects.create(
#             product=product,
#             base_price=base_price,
#             current_price=base_price,
#             start_time=start_time,
#             end_time=end_time
#         )
#         return CreateAuctionRoom(auction=auction)
    
 

# class Query(graphene.ObjectType):
#     auction_room = graphene.Field(AuctionRoomType, id=graphene.ID(required=True))
#     all_auction_rooms = graphene.List(AuctionRoomType)
    

#     def resolve_auction_room(self, info, id):
#         return AuctionRoom.objects.get(id=id)

#     def resolve_all_auction_rooms(self, info):
#         return AuctionRoom.objects.all()

# class Mutation(graphene.ObjectType):
#     join_auction_room = JoinAuctionRoom.Field()
#     place_bid = PlaceBid.Field()
#     create_auction_room = CreateAuctionRoom.Field()



import graphene
from graphene_django.types import DjangoObjectType
from .models import AuctionRoom, Bid, AuctionParticipant
from dashboard.models import Product
from graphql import GraphQLError
import channels_graphql_ws
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()

class AuctionRoomType(DjangoObjectType):
    class Meta:
        model = AuctionRoom
        fields = '__all__'

class BidType(DjangoObjectType):
    class Meta:
        model = Bid

class JoinAuctionRoom(graphene.Mutation):
    class Arguments:
        auction_room_id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(self, info, auction_room_id):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("Authentication required.")

        room = AuctionRoom.objects.get(id=auction_room_id)
        AuctionParticipant.objects.get_or_create(auction_room=room, user=user)
        return JoinAuctionRoom(success=True)

class PlaceBid(graphene.Mutation):
    class Arguments:
        auction_room_id = graphene.ID(required=True)
        amount = graphene.Float(required=True)

    bid = graphene.Field(BidType)

    def mutate(self, info, auction_room_id, amount):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("Authentication required.")

        try:
            room = AuctionRoom.objects.get(id=auction_room_id)
        except AuctionRoom.DoesNotExist:
            raise GraphQLError("Auction room not found.")

        # Check if user joined
        if not AuctionParticipant.objects.filter(auction_room=room, user=user).exists():
            raise GraphQLError("You must join the auction room before placing a bid.")

        if timezone.now() < room.start_time:
            raise GraphQLError("Auction has not started yet.")
        if timezone.now() > room.end_time:
            raise GraphQLError("Auction has ended.")

        last_bid = room.bids.first()
        min_required = last_bid.amount if last_bid else room.current_price

        if amount <= min_required:
            raise GraphQLError(f"Bid must be greater than {min_required:.2f}.")

        bid = Bid.objects.create(auction_room=room, bidder=user, amount=amount)

        room.current_price = amount
        room.end_time += timedelta(minutes=1)
        room.save()

        AuctionRoomUpdated.broadcast(group=str(room.id), payload={"room_id": room.id})

        return PlaceBid(bid=bid)

class CreateAuctionRoom(graphene.Mutation):
    auction = graphene.Field(AuctionRoomType)

    class Arguments:
        product_id = graphene.ID(required=True)
        base_price = graphene.Float(required=True)
        start_time = graphene.DateTime(required=True)
        end_time = graphene.DateTime(required=True)
        increment = graphene.Float(required=False)

    def mutate(self, info, product_id, base_price, start_time, end_time, increment=1.0):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("You must be logged in.")

        try:
            product = Product.objects.get(id=product_id, owner=user)
        except Product.DoesNotExist:
            raise GraphQLError("Invalid product or permission denied.")

        auction = AuctionRoom.objects.create(
            product=product,
            base_price=base_price,
            current_price=base_price,
            start_time=start_time,
            end_time=end_time,
            increment=increment,
        )
        return CreateAuctionRoom(auction=auction)

class AuctionRoomUpdated(channels_graphql_ws.Subscription):
    room_id = graphene.ID()

    class Arguments:
        room_id = graphene.ID()

    def subscribe(self, info, room_id):
        return [str(room_id)]

    def publish(self, info, room_id):
        return AuctionRoomUpdated(room_id=room_id)

class Mutation(graphene.ObjectType):
    join_auction_room = JoinAuctionRoom.Field()
    place_bid = PlaceBid.Field()
    create_auction_room = CreateAuctionRoom.Field()

class Subscription(graphene.ObjectType):
    auction_updated = AuctionRoomUpdated.Field()

class Query(graphene.ObjectType):
    auction_rooms = graphene.List(AuctionRoomType)

    def resolve_auction_rooms(self, info):
        return AuctionRoom.objects.all()

schema = graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)