from django.contrib import admin

# Register your models here.
from .models import AuctionParticipant, AuctionRoom, Bid

admin.site.register(AuctionParticipant)
admin.site.register(AuctionRoom)
admin.site.register(Bid)