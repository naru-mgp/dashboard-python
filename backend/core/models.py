from django.db import models

# Create your models here.

class Coin(models.Model):

    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10)
    coingecko_id = models.CharField(max_length=100, unique=True)

    def __str__(self):
         
        return self.name
    
class MarketSnapshots(models.Model):

    coin = models.ForeignKey(Coin, on_delete=models.CASCADE, related_name="snapshots")

    price = models.FloatField()
    market_cap = models.FloatField(null=True, blank=True)
    volume = models.FloatField(null=True, blank=True)

    timestamp = models.DateTimeField(auto_now_add=True)
        
    def __str__(self):
        return f"{self.coin.name} - {self.price} USD"