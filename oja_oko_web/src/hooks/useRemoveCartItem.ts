import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { cartService } from "../services/cartService";


export const useRemoveCartItem = () => {

  const queryClient =
    useQueryClient();


  return useMutation({

    mutationFn: (
      id: number
    ) =>
      cartService.removeCartItem(id),


    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: [
          "cart",
        ],
      });

    },

  });

};