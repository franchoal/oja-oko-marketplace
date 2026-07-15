import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  orderService,
  type CheckoutData,
} from "../services/orderService";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CheckoutData) =>
      orderService.checkout(data),

    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      return response;
    },
  });
};