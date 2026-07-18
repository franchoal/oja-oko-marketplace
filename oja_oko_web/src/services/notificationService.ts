import { api } from "./api";

export interface Notification {
  id: number;

  title: string;

  message: string;

  notification_type: string;

  is_read: boolean;

  created_at: string;
}

/* ==========================================
   Paginated Notifications
========================================== */

export interface PaginatedNotifications {
  count: number;

  next: string | null;

  previous: string | null;

  results: Notification[];
}

export const notificationService = {
  /**
   * Current user's notifications
   */
  getNotifications:
    async (): Promise<PaginatedNotifications> => {

      const response =
        await api.get<PaginatedNotifications>(
          "/notifications/"
        );

      return response.data;
    },

  /**
   * Single notification details
   */
  getNotification:
    async (
      id: number
    ): Promise<Notification> => {

      const response =
        await api.get<Notification>(
          `/notifications/${id}/`
        );

      return response.data;
    },

  /**
   * Mark one notification as read
   */
  markNotificationRead:
    async (
      id: number
    ): Promise<Notification> => {

      const response =
        await api.patch<Notification>(
          `/notifications/${id}/read/`
        );

      return response.data;
    },

  /**
   * Mark all notifications as read
   */
  markAllNotificationsRead:
    async (): Promise<void> => {

      await api.post(
        "/notifications/read-all/"
      );
    },
};
