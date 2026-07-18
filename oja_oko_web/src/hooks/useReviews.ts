import { useQuery } from "@tanstack/react-query";

import { reviewService } from "../services/reviewService";

export const useReviews = (
  productId: number
) => {
  return useQuery({
    queryKey: [
      "reviews",
      productId,
    ],

    queryFn: () =>
      reviewService.getReviews(
        productId
      ),

    enabled: !!productId,

    staleTime: 1000 * 60 * 5,
  });
};