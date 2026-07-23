from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os


User = get_user_model()


class Command(BaseCommand):

    help = "Create production admin user"


    def handle(self, *args, **kwargs):

        email = os.environ.get(
            "ADMIN_EMAIL"
        )

        password = os.environ.get(
            "ADMIN_PASSWORD"
        )


        if not email or not password:
            self.stdout.write(
                self.style.ERROR(
                    "ADMIN_EMAIL and ADMIN_PASSWORD required"
                )
            )
            return


        if User.objects.filter(
            email=email
        ).exists():

            self.stdout.write(
                self.style.WARNING(
                    "Admin already exists"
                )
            )

            return


        User.objects.create_superuser(
            email=email,
            password=password,
            first_name="Admin",
            last_name="Oja-Oko",
        )


        self.stdout.write(
            self.style.SUCCESS(
                "Superuser created successfully"
            )
        )