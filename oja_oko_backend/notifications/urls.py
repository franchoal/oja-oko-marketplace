from django.urls import path

from .views import (
    NotificationDetailView,
    NotificationListView,
    NotificationReadAllView,
    NotificationReadView,
)

app_name = "notifications"

urlpatterns = [
    # User notification list
    path(
        "",
        NotificationListView.as_view(),
        name="notification-list",
    ),

    # Mark all notifications as read
    path(
        "read-all/",
        NotificationReadAllView.as_view(),
        name="notification-read-all",
    ),

    # Notification detail
    path(
        "<int:pk>/",
        NotificationDetailView.as_view(),
        name="notification-detail",
    ),

    # Mark one notification as read
    path(
        "<int:pk>/read/",
        NotificationReadView.as_view(),
        name="notification-read",
    ),
]