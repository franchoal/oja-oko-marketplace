import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

import { farmerService } from "../services/farmerService";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      farmerService.deleteProduct(id),

    onSuccess: () => {
      toast.success(
        "Product deleted successfully!"
      );

      queryClient.invalidateQueries({
        queryKey: ["farmer-products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          typeof error.response?.data ===
          "object"
            ? Object.values(
                error.response.data
              )
                .flat()
                .join("\n")
            : "Failed to delete product.";

        toast.error(message);
      } else {
        toast.error(
          "Failed to delete product."
        );
      }
    },
  });
};