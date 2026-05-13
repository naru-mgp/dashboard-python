import requests

class CoinGeckoService:

    BASE_URL = "https://api.coingecko.com/api/v3"


    @staticmethod
    def get_market_data_batch(coins_ids):

        ids = ",".join(coins_ids)

        url = f"{CoinGeckoService.BASE_URL}/coins/markets"

        params = {
            "vs_currency": "usd",
            "ids" : ids
        }

        response = requests.get(url, params=params)

        response.raise_for_status()

        return response.json()

    @staticmethod
    def get_market_data(coin_id):

        url = f"{CoinGeckoService.BASE_URL}/coins/markets"

        params = {

            "vs_currency": "usd",
            "ids": coin_id
        }
        
        response = requests.get(url, params=params)

        response.raise_for_status()

        data = response.json()

        if not data:
            raise Exception(f"No data returned from CoinGecko")

        if not isinstance(data, list):
            raise Exception(f"Unexpected response: {data}") 

        return data[0]
    
    @staticmethod
    def get_top_coins(limit=10):

        url = f"{CoinGeckoService.BASE_URL}/coins/markets"

        params = {

            "vs_currency" : "usd",
            "order" : "market_cap_desc",
            "per_page" : limit,
            "page" : 1

        }

        response = requests.get(url, params=params)

        return response.json()