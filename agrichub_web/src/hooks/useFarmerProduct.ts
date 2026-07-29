import { useQuery } from "@tanstack/react-query";

import {
  farmerService,
  type FarmerProduct,
} from "../services/farmerService";

export const useFarmerProduct = (
  id: number
) => {
  return useQuery<FarmerProduct>({
    queryKey: [
      "farmer-product",
      id,
    ],

    queryFn: () =>
      farmerService.getProduct(id),

    enabled: !!id,

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
};