import { useQuery } from "@tanstack/react-query";

import { farmerService } from "../services/farmerService";

export const useFarmerProducts = () => {
  return useQuery({
    queryKey: ["farmer-products"],

    queryFn: () =>
      farmerService.getMyProducts(),

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
};