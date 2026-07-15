import { useQuery } from "@tanstack/react-query";

import { farmerService } from "../services/farmerService";

import axios from "axios";


export const useFarmerProfile = () => {

  return useQuery({

    queryKey: [
      "farmer-profile",
    ],


    queryFn:
      farmerService.getProfile,


    retry: false,


    staleTime:
      1000 * 60 * 5,


    refetchOnWindowFocus: false,


    refetchOnReconnect: false,


    throwOnError: false,


    retryOnMount: false,


    enabled: true,


    select: (data) => data,


  });

};