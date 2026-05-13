from core.models import Coin, MarketSnapshots
from .coingecko_service import CoinGeckoService
    
class SnapshotService:

    @staticmethod
    def create_snapshots():


        coins = Coin.objects.all()

        coin_map = {

            coin.coingecko_id: coin
            for coin in coins

        }

        
        data = CoinGeckoService.get_market_data_batch(
            coin_map.keys()
        )

        created_snapshots = []
    
        for item in data:

            coin = coin_map[item["id"]]
    
            snapshot = MarketSnapshots.objects.create(

                coin = coin,
                price = item["current_price"], 
                market_cap = item["market_cap"],
                volume = item["total_volume"]
            )

        created_snapshots.append(snapshot)

        return created_snapshots    
        