import { api } from "./api";

export interface Notification {
  id: number;
  title: string;
  message: string;
  notification_type: string;
  is_read: boolean;
  created_at: string;
}

export const notificationService = {
  /**
   * Current user's notifications
   */
  getNotifications: async (): Promise<Notification[]> => {
    const response = await api.get<Notification[]>(
      "/notifications/"
    );

    return response.data;
  },

  /**
   * Notification details
   */
  getNotification: async (
    id: number
  ): Promise<Notification> => {
    const response = await api.get<Notification>(
      `/notifications/${id}/`
    );

    return response.data;
  },
};