from rest_framework import generics, permissions, status
from rest_framework.response import Response

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


class NotificationReadView(generics.UpdateAPIView):
    """
    Mark a notification as read.
    """

    serializer_class = NotificationSerializer

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_queryset(self):

        return Notification.objects.filter(
            user=self.request.user
        )

    def patch(self, request, *args, **kwargs):

        notification = self.get_object()

        notification.is_read = True

        notification.save(
            update_fields=[
                "is_read",
            ]
        )

        return Response(
            NotificationSerializer(
                notification
            ).data,
            status=status.HTTP_200_OK,
        )


class NotificationReadAllView(generics.GenericAPIView):
    """
    Mark all notifications as read.
    """

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def post(self, request):

        Notification.objects.filter(
            user=request.user,
            is_read=False,
        ).update(
            is_read=True,
        )

        return Response(
            {
                "message": (
                    "All notifications marked as read."
                )
            },
            status=status.HTTP_200_OK,
        )