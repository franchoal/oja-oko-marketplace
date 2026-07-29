import { useQuery } from "@tanstack/react-query";

import { cartService } from "../services/cartService";
import { useAuthStore } from "../store/authStore";

export const useCart = () => {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const user = useAuthStore(
    (state) => state.user
  );

  return useQuery({
    queryKey: ["cart"],

    queryFn: cartService.getCart,

    enabled:
      isAuthenticated &&
      user?.role === "buyer",

    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
  });
};