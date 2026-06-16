from django.core.management.base import BaseCommand
from core.models import Coin
from core.services.snapshot_service import SnapshotService

class Command(BaseCommand):

    help = "Genera snapshots de todas las monedas"

    def handle(self, *args, **kwargs):

        coins = Coin.objects.all()

        try:

                snapshots = SnapshotService.create_snapshots()

                self.stdout.write(
                    self.style.SUCCESS(
                    f"{len(snapshots)} Snapshots generados correctamente"

                    )

                  )
        except Exception as error:
                 
                self.stdout.write(
                    self.style.ERROR(
                        f"Error al generar Snapshots: {error}"

                    )

                )   