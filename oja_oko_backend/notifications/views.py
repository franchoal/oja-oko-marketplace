from rest_framework import generics, permissions

from .models import Notification
from .serializers import NotificationSerializer


class NotificationListView(generics.ListAPIView):
    """
    List notifications belonging to the authenticated user.
    """

    serializer_class = NotificationSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]


    def get_queryset(self):

        return Notification.objects.filter(
            user=self.request.user
        ).select_related(
            "user",
        )



class NotificationDetailView(generics.RetrieveAPIView):
    """
    View a single notification belonging to the authenticated user.
    """

    serializer_class = NotificationSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]


    def get_queryset(self):

        return Notification.objects.filter(
            user=self.request.user
        ).select_related(
            "user",
        )