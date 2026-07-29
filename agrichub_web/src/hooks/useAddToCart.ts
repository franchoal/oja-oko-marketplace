import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { cartService } from "../services/cartService";

import type {
  AddToCartData,
} from "../types/cart";

export const useAddToCart = () => {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: (
      data: AddToCartData
    ) => cartService.addToCart(data),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: [
          "cart",
        ],
      });

      toast.success(
        "Product added to cart successfully."
      );

    },

    onError: () => {

      toast.error(
        "Unable to add product to cart."
      );

    },

  });

};