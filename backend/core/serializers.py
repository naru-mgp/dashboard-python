from rest_framework import serializers
from core.models import MarketSnapshots, Coin

#EndPoints de testeo----------------------------------------------
class CoinSerializer(serializers.ModelSerializer):

    class Meta:

        model = Coin
        
        fields = ["id",
                  "name",
                  "symbol",
                  "coingecko_id"
                  ]

class MarketSnapshotSerializer(serializers.ModelSerializer):

    coin = CoinSerializer(read_only=True)

    class Meta:

        model = MarketSnapshots

        fields = ["id",
                  "coin",
                  "price",
                  "market_cap",
                  "volume",
                  "timestamp"
                  ]
#-------------------------------------------------------------------        

class CoinSerializerFE(serializers.ModelSerializer):
     
    class Meta:
        
        model = Coin

        fields = ["name",
                  "symbol",
                  "coingecko_id"
                 ]

class CoinDetailSerializerFE(serializers.ModelSerializer):

    class Meta:

        model = Coin

        fields = ["name",
                  "symbol",
                  "coingecko_id"]


class MarketSnapshotSerializerFE(serializers.ModelSerializer):
     
    class Meta:
        
        model = MarketSnapshots

        fields = ["coin",
                  "price",
                  "market_cap",
                  "volume",
                  "timestamp"
                  ]

class CoinHistoryFE(serializers.ModelSerializer):
    
    class Meta:

        model = MarketSnapshots

        fields = ["timestamp",
                  "price"]

