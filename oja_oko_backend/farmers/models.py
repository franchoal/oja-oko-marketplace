from django.conf import settings
from django.db import models


class FarmerProfile(models.Model):
    """
    Extended profile information for farmers.

    A farmer profile is connected to a User
    with the farmer role.
    """

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="farmer_profile",
    )

    farm_name = models.CharField(
        max_length=255,
    )

    farm_location = models.CharField(
        max_length=255,
    )

    farm_description = models.TextField(
        blank=True,
    )

    is_verified = models.BooleanField(
        default=False,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        verbose_name = "Farmer Profile"
        verbose_name_plural = "Farmer Profiles"

    def __str__(self):
        return self.farm_name
