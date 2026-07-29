import { useQuery } from "@tanstack/react-query";

import { orderService } from "../services/orderService";

export const useFarmerOrder = (
  id: number
) => {
  return useQuery({
    queryKey: ["farmer-order", id],

    queryFn: () =>
      orderService.getFarmerOrder(id),

    enabled: !!id,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
};