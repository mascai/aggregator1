from django.conf import settings
from django.db import models
from django.utils import timezone


class Shop(models.Model):
    """ Wildberries, Lamoda, Ozon"""
    title = models.CharField(max_length=200, default="ShopName")

    def __str__(self):
        return self.title


class Product(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, related_name="shop")
    title = models.CharField(max_length=200, default="ProductName")
    price = models.FloatField(max_length=200, default=0)
    image = models.ImageField(blank=True)

    def __str__(self):
        return self.title
