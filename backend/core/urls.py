from django.urls import path
from .views import snapshots, coin_list, coin_history, last_snapshot, coin_detail

urlpatterns = [

    path(

        'snapshots/',
        snapshots
    ),

    path("coins/", coin_list),

    path("coins/<str:coin_id>/history", coin_history),

    path("coins/<str:coin_id>/latest", last_snapshot),

    path("coins/<str:coin_id>", coin_detail),





]
