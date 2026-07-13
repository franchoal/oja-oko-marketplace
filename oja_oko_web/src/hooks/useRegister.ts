import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

import { authService, type RegisterData } from "../services/authService";

export const useRegister = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),

    onSuccess: () => {
      toast.success("Account created successfully!");

      if (onSuccess) {
        onSuccess();
      }
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);

        const message =
          typeof error.response?.data === "object"
            ? Object.values(error.response.data).flat().join("\n")
            : "Registration failed.";

        toast.error(message);
      } else {
        toast.error("Registration failed.");
      }
    },
  });
};