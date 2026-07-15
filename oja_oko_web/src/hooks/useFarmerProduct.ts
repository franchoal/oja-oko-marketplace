import { useQuery } from "@tanstack/react-query";

import {
  farmerService,
} from "../services/farmerService";

export const useFarmerProduct = (
  id: number
) => {

  return useQuery({

    queryKey: [
      "farmer-product",
      id,
    ],

    queryFn: () =>
      farmerService.getProduct(id),

    enabled: !!id,

  });

};