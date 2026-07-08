from django.urls import path

from .views import (
    NotificationDetailView,
    NotificationListView,
)

app_name = "notifications"

urlpatterns = [
    # User notification list
    path(
        "",
        NotificationListView.as_view(),
        name="notification-list",
    ),

    # Notification detail
    path(
        "<int:pk>/",
        NotificationDetailView.as_view(),
        name="notification-detail",
    ),
]