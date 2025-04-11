# # auction/subscriptions.py
# import graphene
# from channels_graphql_ws import Subscription
# from .models import AuctionRoom, Bid
# from .schema import BidType

# class NewBidSubscription(Subscription):
#     bid = graphene.Field(lambda: BidType)

#     class Arguments:
#         auction_room_id = graphene.ID(required=True)

#     def subscribe(self, info, auction_room_id):
#         return [f"room_{auction_room_id}"]

#     def publish(self, info, auction_room_id):
#         return NewBidSubscription(bid=self.bid)

#     @classmethod
#     def notify_new_bid(cls, bid):
#         cls.broadcast(group=f"room_{bid.auction_room.id}", payload={"bid": bid})

# class Subscription(graphene.ObjectType):
#     new_bid = NewBidSubscription.Field()