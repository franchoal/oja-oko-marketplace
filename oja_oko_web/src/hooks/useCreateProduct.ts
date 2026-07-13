import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  farmerService,
  type CreateFarmerProductData,
} from "../services/farmerService";


export const useCreateProduct = (
  onSuccess?: () => void
) => {

  const queryClient = useQueryClient();


  return useMutation({

    mutationFn: (
      data: CreateFarmerProductData
    ) =>
      farmerService.createProduct(data),


    onSuccess: () => {

      toast.success(
        "Product created successfully!"
      );


      // Refresh public marketplace products
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });


      // Refresh farmer dashboard products
      queryClient.invalidateQueries({
        queryKey: ["farmer-products"],
      });


      if (onSuccess) {
        onSuccess();
      }

    },


    onError: (error) => {

      if (axios.isAxiosError(error)) {

        console.error(error.response?.data);


        const message =
          typeof error.response?.data === "object"
            ? Object.values(error.response.data)
                .flat()
                .join("\n")
            : "Failed to create product.";


        toast.error(message);

      } else {

        toast.error(
          "Failed to create product."
        );

      }

    },

  });

};