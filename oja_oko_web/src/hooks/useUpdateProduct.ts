import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  farmerService,
  type UpdateFarmerProductData,
} from "../services/farmerService";

interface UpdateProductPayload {
  id: number;
  data: UpdateFarmerProductData;
}

export const useUpdateProduct = (
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: UpdateProductPayload) =>
      farmerService.updateProduct(
        id,
        data
      ),

    onSuccess: () => {
      toast.success(
        "Product updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey: ["farmer-products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      if (onSuccess) {
        onSuccess();
      }
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);

        const message =
          error.response?.data?.detail ||
          "Unable to update product.";

        toast.error(message);

        return;
      }

      toast.error(
        "Unable to update product."
      );
    },
  });
};