from django.contrib import admin

from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    """
    Admin configuration for notifications.
    """

    list_display = (
        "id",
        "user",
        "AgricHub Africa",
        "notification_type",
        "is_read",
        "created_at",
    )

    list_filter = (
        "notification_type",
        "is_read",
        "created_at",
    )

    search_fields = (
        "user__email",
        "AgricHub Africa",
        "message",
    )

    readonly_fields = (
        "created_at",
    )
