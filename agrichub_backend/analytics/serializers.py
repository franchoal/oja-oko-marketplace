from rest_framework import serializers


class AnalyticsSerializer(serializers.Serializer):
    """
    Serializer for administrator analytics data.
    """

    total_users = serializers.IntegerField()

    user_growth = serializers.ListField()

    total_products = serializers.IntegerField()

    product_growth = serializers.ListField()

    total_orders = serializers.IntegerField()

    order_status_distribution = serializers.DictField()

    total_revenue = serializers.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    active_farmers = serializers.IntegerField()

    active_buyers = serializers.IntegerField()