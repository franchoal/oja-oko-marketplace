import { useQuery } from "@tanstack/react-query";

import { notificationService } from "../services/notificationService";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],

    queryFn: notificationService.getNotifications,

    staleTime: 1000 * 60,

    refetchOnWindowFocus: true,
  });
};