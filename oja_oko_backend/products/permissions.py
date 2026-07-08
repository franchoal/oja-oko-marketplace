from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsFarmerOrReadOnly(BasePermission):
    """
    Anyone can view products.
    Only authenticated farmers can create products.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        return (
            request.user.is_authenticated
            and request.user.role == request.user.FARMER
        )


class IsOwnerOrReadOnly(BasePermission):
    """
    Only the farmer who owns a product can edit or delete it.
    Everyone can view products.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.farmer == request.user