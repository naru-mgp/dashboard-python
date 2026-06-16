from rest_framework.response  import Response
from rest_framework.decorators import api_view
from rest_framework import generics


from core.models import MarketSnapshots, Coin
from core.serializers import MarketSnapshotSerializer, CoinSerializerFE, CoinHistoryFE, MarketSnapshotSerializerFE, CoinDetailSerializerFE
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def snapshots(request):

    snapshots = MarketSnapshots.objects.all().order_by('-timestamp')[:100]

    serializer = MarketSnapshotSerializer(
        snapshots,
        many=True
        )

    return Response(serializer.data)

@api_view(['GET'])
def coin_detail(request, coin_id):

    coin_detail = Coin.objects.get(coingecko_id=coin_id)

    serializer = CoinDetailSerializerFE(coin_detail)

    return Response(serializer.data)


@api_view(['GET'])
def coin_list(request):

    coins = Coin.objects.all()
    
    serializer = CoinSerializerFE(
        coins,
        many=True

    )

    return Response(serializer.data)

@api_view(['GET'])
def coin_history(request, coin_id):

    history = MarketSnapshots.objects.filter(coin__coingecko_id=coin_id)

    history = history.order_by("timestamp")

    serializer = CoinHistoryFE(
        history,
        many=True
    )
    return Response(serializer.data)

@api_view(['GET'])
def last_snapshot(request, coin_id):

    last_snapshot = MarketSnapshots.objects.filter(coin__coingecko_id=coin_id).latest("timestamp")

    serializer = MarketSnapshotSerializerFE(last_snapshot)

    return Response(serializer.data)

    
