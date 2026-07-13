import { useQuery } from "@tanstack/react-query";

import { farmerService } from "../services/farmerService";

export const useFarmerProfile = () => {
  return useQuery({
    queryKey: ["farmer-profile"],

    queryFn: farmerService.getProfile,

    retry: false,

    staleTime: 1000 * 60 * 5,
  });
};