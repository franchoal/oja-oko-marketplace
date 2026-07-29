import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { cartService } from "../services/cartService";

import type {
  UpdateCartItemData,
} from "../types/cart";


export const useUpdateCartItem = () => {

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateCartItemData;
    }) =>
      cartService.updateCartItem(
        id,
        data
      ),


    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: [
          "cart",
        ],
      });

    },

  });

};