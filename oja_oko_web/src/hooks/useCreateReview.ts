import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reviewService } from "../services/reviewService";
import type { CreateReviewData } from "../services/reviewService";

export const useCreateReview = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateReviewData
    ) =>
      reviewService.createReview(
        data
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "reviews",
          variables.product,
        ],
      });
    },
  });
};