from core.models import Coin
from .coingecko_service import CoinGeckoService

class CoinService:

    @staticmethod
    def sync_top_coins(limit=10):
        
        coins_data = CoinGeckoService.get_top_coins(limit)

        for data in coins_data:

            name = data["name"]
            symbol = data["symbol"]
            coingecko_id = data["id"]

            Coin.objects.update_or_create(

                coingecko_id = coingecko_id,

                defaults = {
                    "name" : name,
                    "symbol" : symbol.upper()

                }  

            )