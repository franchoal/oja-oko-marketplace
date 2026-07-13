import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

import { farmerService } from "../services/farmerService";

import type { FarmerProfile } from "../services/farmerService";

export const useCreateFarmerProfile = (
  onSuccess?: () => void
) => {
  return useMutation({
    mutationFn: (
      data: Omit<
        FarmerProfile,
        "id" | "is_verified"
      >
    ) =>
      farmerService.createProfile(
        data
      ),

    onSuccess: () => {
      toast.success(
        "Farm profile created successfully!"
      );

      if (onSuccess) {
        onSuccess();
      }
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error(
          error.response?.data
        );

        const message =
          typeof error.response
            ?.data === "object"
            ? Object.values(
                error.response.data
              )
                .flat()
                .join("\n")
            : "Failed to create farm profile.";

        toast.error(message);

        return;
      }

      toast.error(
        "Failed to create farm profile."
      );
    },
  });
};