import { useQuery } from "@tanstack/react-query";

import {
  farmerService,
  type FarmerProduct,
} from "../services/farmerService";

export const useFarmerProducts = () => {
  return useQuery<FarmerProduct[]>({
    queryKey: ["farmer-products"],

    queryFn: () =>
      farmerService.getMyProducts(),

    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};