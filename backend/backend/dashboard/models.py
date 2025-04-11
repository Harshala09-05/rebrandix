# Create your models here.
from django.db import models

from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from .managers import CustomUserManager  # Define this separately

class User(AbstractUser):
    username = models.CharField(max_length=150, blank=True, null=True)
    email = models.EmailField()
    
    role = models.CharField(
    max_length=100,
    choices=[
        ('brand', 'Brand'),
        ('wholesaler', 'Wholesaler'),
        ('smallscaller', 'Small Scaller')
    ],
    null=True,
    blank=True
)
    
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)

    groups = models.ManyToManyField(Group, related_name='customuser_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='customuser_permissions', blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = CustomUserManager()

    # class Meta:
    #     db_table = 'User_detail'

    def __str__(self):
        return self.email



class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_id", null=True, blank=True)
    
    # New fields
    iso_certificate = models.FileField(upload_to='certificates/', null=True, blank=True)
    product_image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    iso_found = models.BooleanField(default=False)
    certificate_number = models.IntegerField(default=0)  # Default value added
    issuer = models.CharField(max_length=225, null=True, blank=True)
    trust_score = models.IntegerField(
        default=0,  # Example default
    )
    final_verdict = models.CharField(max_length=225, null=True, blank=True)
    

    def __str__(self):
        return self.name
    


# class Brand_Wholsaler_Profiles(models.modes):
#     last_bid =
#     previous_auction =
#     acution_participated -=