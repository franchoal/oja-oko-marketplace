import { useQuery } from "@tanstack/react-query";

import { orderService } from "../services/orderService";

export const useOrder = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],

    queryFn: () => orderService.getOrder(id),

    enabled: !!id,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
};