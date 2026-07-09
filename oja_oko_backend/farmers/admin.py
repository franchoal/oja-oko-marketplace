from django.contrib import admin

from .models import FarmerProfile


@admin.register(FarmerProfile)
class FarmerProfileAdmin(admin.ModelAdmin):
    """
    Admin configuration for farmer profiles.
    """

    list_display = [
        "farm_name",
        "farm_location",
        "user",
        "is_verified",
        "created_at",
    ]

    list_filter = [
        "is_verified",
        "created_at",
    ]

    search_fields = [
        "farm_name",
        "farm_location",
        "user__email",
        "user__first_name",
        "user__last_name",
    ]

    readonly_fields = [
        "created_at",
        "updated_at",
    ]