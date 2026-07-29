from rest_framework.pagination import PageNumberPagination


class MarketplacePagination(PageNumberPagination):
    """
    Standard marketplace pagination.
    """

    page_size = 12

    page_size_query_param = "page_size"

    max_page_size = 48