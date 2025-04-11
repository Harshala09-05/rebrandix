from django.db import models
from dashboard.models import Product
from django.contrib.auth import get_user_model
User = get_user_model()


# Create your models here.
class AuctionRoom(models.Model):
    AUCTION_TYPE = (
        ('brand_only', 'Brand Only'),
        ('wholesaler_only', 'Wholesaler Only'),
        ('open', 'Open'),
    )
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    auction_type = models.CharField(max_length=20, choices=AUCTION_TYPE)
    base_price = models.FloatField()
    current_price = models.FloatField(default=0.0)
    increment = models.FloatField(default=1.0)  # added increment
    start_time = models.DateTimeField()

    end_time = models.DateTimeField()

class AuctionParticipant(models.Model):
    auction_room = models.ForeignKey(AuctionRoom, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

class Bid(models.Model):
    auction_room = models.ForeignKey(AuctionRoom, on_delete=models.CASCADE, related_name='bids')
    bidder = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
