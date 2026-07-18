import { Card, Button } from "../../components/ui";

import {
  useNotifications,
} from "../../hooks/useNotifications";

import {
  notificationService,
} from "../../services/notificationService";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const NotificationsPage = () => {

  const queryClient = useQueryClient();

  const {
    data: notifications,
    isLoading,
    isError,
  } = useNotifications();

  const notificationList =
    notifications?.results ?? [];

  const unreadCount =
    notificationList.filter(
      (notification) =>
        !notification.is_read
    ).length;

  const markReadMutation = useMutation({

    mutationFn: (
      id: number
    ) =>
      notificationService.markNotificationRead(
        id
      ),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: [
          "notifications",
        ],
      });

    },

  });

  const markAllMutation = useMutation({

    mutationFn:
      notificationService.markAllNotificationsRead,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: [
          "notifications",
        ],
      });

    },

  });

  if (isLoading) {

    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <p>
          Loading notifications...
        </p>
      </main>
    );

  }

  if (isError) {

    return (
      <main className="mx-auto max-w-5xl px-6 py-10">

        <Card className="border-red-200 bg-red-50 p-8">

          <h2 className="text-xl font-bold text-red-700">
            Unable to load notifications
          </h2>

        </Card>

      </main>
    );

  }

  return (

    <main className="mx-auto max-w-5xl px-6 py-10">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

          <p className="mt-2 text-gray-600">
            Stay updated with your marketplace activity.
          </p>

        </div>

        {unreadCount > 0 && (

          <Button

            onClick={() =>
              markAllMutation.mutate()
            }

            disabled={
              markAllMutation.isPending
            }

          >

            {markAllMutation.isPending
              ? "Updating..."
              : "Mark All Read"}

          </Button>

        )}

      </div>

      {notificationList.length === 0 ? (

        <Card className="p-10 text-center">

          <h2 className="text-2xl font-semibold">
            No notifications
          </h2>

          <p className="mt-2 text-gray-500">
            You are all caught up.
          </p>

        </Card>

      ) : (

        <div className="space-y-5">

          {notificationList.map((notification) => (

            <div
              key={notification.id}

              onClick={() => {

                if (!notification.is_read) {

                  markReadMutation.mutate(
                    notification.id
                  );

                }

              }}

              className="cursor-pointer"
            >

              <Card

                className={`border-l-4 transition hover:shadow-md ${
                  notification.is_read
                    ? "border-gray-300"
                    : "border-green-600 bg-green-50"
                }`}

              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h2 className="text-lg font-bold">
                      {notification.title}
                    </h2>

                    <p className="mt-2 text-gray-600">
                      {notification.message}
                    </p>

                  </div>

                  {!notification.is_read && (

                    <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
                      New
                    </span>

                  )}

                </div>

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    {notification.notification_type.replaceAll(
                      "_",
                      " "
                    )}
                  </span>

                  <span className="text-sm text-gray-500">
                    {new Date(
                      notification.created_at
                    ).toLocaleString()}
                  </span>

                </div>

              </Card>

            </div>

          ))}

        </div>

      )}

    </main>

  );

};

export default NotificationsPage;