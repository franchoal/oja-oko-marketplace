import { useQuery } from "@tanstack/react-query";

import {
  productService,
  type ProductFilters,
} from "../services/productService";


export const useProducts = (
  filters?: ProductFilters
) => {

  return useQuery({

    queryKey: [
      "products",
      filters,
    ],


    queryFn: () =>
      productService.getProducts(
        filters
      ),


    staleTime:
      1000 * 60 * 5,


    refetchOnWindowFocus:
      false,


    placeholderData:
      (previousData) =>
        previousData,

  });

};