from django.contrib import admin

from .models import FarmerProfile


@admin.action(description="Verify selected farmers")
def verify_selected_farmers(
    modeladmin,
    request,
    queryset,
):
    """
    Approve selected farmers for
    marketplace participation.
    """

    updated = queryset.update(
        is_verified=True,
    )

    modeladmin.message_user(
        request,
        f"{updated} farmer(s) verified successfully.",
    )


@admin.action(description="Unverify selected farmers")
def unverify_selected_farmers(
    modeladmin,
    request,
    queryset,
):
    """
    Remove marketplace approval from
    selected farmers.

    Products remain in the system but
    are automatically hidden from the
    public marketplace because the
    marketplace only displays:

    • Verified farmers
    • Available products
    """

    updated = queryset.update(
        is_verified=False,
    )

    modeladmin.message_user(
        request,
        f"{updated} farmer(s) unverified successfully.",
    )


@admin.register(FarmerProfile)
class FarmerProfileAdmin(admin.ModelAdmin):
    """
    Farmer administration.

    Verification is controlled only
    by administrators.
    """

    list_display = (
        "farm_name",
        "user",
        "farm_location",
        "is_verified",
        "created_at",
    )

    list_filter = (
        "is_verified",
        "created_at",
    )

    search_fields = (
        "farm_name",
        "user__email",
        "user__first_name",
        "user__last_name",
        "farm_location",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    list_per_page = 25

    actions = (
        verify_selected_farmers,
        unverify_selected_farmers,
    )

    fieldsets = (
        (
            "Farmer Information",
            {
                "fields": (
                    "user",
                    "farm_name",
                    "farm_location",
                    "farm_description",
                )
            },
        ),
        (
            "Verification",
            {
                "fields": (
                    "is_verified",
                )
            },
        ),
        (
            "System Information",
            {
                "fields": (
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )