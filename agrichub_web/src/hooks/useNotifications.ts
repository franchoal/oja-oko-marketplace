import { useQuery } from "@tanstack/react-query";

import { notificationService } from "../services/notificationService";

interface UseNotificationsOptions {
  enabled?: boolean;
}

export const useNotifications = (
  options?: UseNotificationsOptions
) => {

  return useQuery({

    queryKey: [
      "notifications",
    ],

    queryFn:
      notificationService.getNotifications,

    staleTime:
      1000 * 60,

    refetchOnWindowFocus:
      true,

    enabled:
      options?.enabled ?? true,

  });

};