import {
  Bell,
  BellRing,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  Card,
  Button,
} from "../../components/ui";

import {
  useNotifications,
} from "../../hooks/useNotifications";

import {
  notificationService,
} from "../../services/notificationService";

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

  const markReadMutation =
    useMutation({

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

  const markAllMutation =
    useMutation({

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

      <main className="mx-auto max-w-7xl px-6 py-12">

        <div className="space-y-6">

          <div className="h-14 w-72 animate-pulse rounded-xl bg-gray-200" />

          {[1, 2, 3].map((item) => (

            <div
              key={item}
              className="h-36 animate-pulse rounded-[30px] bg-gray-100"
            />

          ))}

        </div>

      </main>

    );

  }

  if (isError) {

    return (

      <main className="mx-auto max-w-6xl px-6 py-12">

        <Card className="rounded-[30px] border-red-200 bg-red-50 p-10">

          <h2 className="text-3xl font-bold text-red-700">

            Unable to Load Notifications

          </h2>

          <p className="mt-4 text-red-600">

            Please try again later.

          </p>

        </Card>

      </main>

    );

  }

  return (

    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* Hero */}

      <section className="mb-12 overflow-hidden rounded-[36px] bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white shadow-xl">

        <div className="grid gap-8 p-10 lg:grid-cols-[1fr_auto] lg:items-center">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">

              Notification Center

            </span>

            <h1 className="mt-6 text-5xl font-extrabold">

              Notifications

            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-green-100">

              Stay updated with your marketplace activity,
              orders, deliveries and important account updates.

            </p>

          </div>

          <div className="space-y-5">

            <div className="rounded-[28px] bg-white/15 p-8 text-center backdrop-blur">

              <BellRing
                size={56}
                className="mx-auto mb-5"
              />

              <p className="text-5xl font-extrabold">

                {unreadCount}

              </p>

              <p className="mt-2 text-green-100">

                Unread

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
                className="w-full bg-white text-green-700 hover:bg-green-50"
              >

                {markAllMutation.isPending
                  ? "Updating..."
                  : "Mark All Read"}

              </Button>

            )}

          </div>

        </div>

      </section>

      {/* Empty State */}

      {notificationList.length === 0 ? (

        <Card className="rounded-[32px] p-20 text-center shadow-lg">

          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-green-100">

            <Bell
              size={56}
              className="text-green-700"
            />

          </div>

          <h2 className="mt-8 text-4xl font-bold text-gray-900">

            You're All Caught Up

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-500">

            There are no new notifications at the moment.
            We'll notify you whenever there's important activity.

          </p>

        </Card>

      ) : (

        <div className="space-y-8">

          {notificationList.map(
            (notification) => (

              <div
  key={notification.id}
  onClick={() => {
    if (!notification.is_read) {
      markReadMutation.mutate(notification.id);
    }
  }}
  className="cursor-pointer"
>

  <Card
    className={`overflow-hidden rounded-[30px] p-0 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
      notification.is_read
        ? "bg-white"
        : "border-l-4 border-green-600 bg-green-50"
    }`}
  >
                <div className="flex flex-col gap-6 p-8 md:flex-row md:items-start md:justify-between">

                  <div className="flex gap-5">

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full ${
                        notification.is_read
                          ? "bg-gray-100"
                          : "bg-green-100"
                      }`}
                    >

                      <BellRing
                        size={28}
                        className={
                          notification.is_read
                            ? "text-gray-500"
                            : "text-green-700"
                        }
                      />

                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="text-2xl font-bold text-gray-900">

                          {notification.title}

                        </h2>

                        {!notification.is_read && (

                          <span className="rounded-full bg-green-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">

                            New

                          </span>

                        )}

                      </div>

                      <p className="mt-4 max-w-3xl leading-8 text-gray-600">

                        {notification.message}

                      </p>

                    </div>

                  </div>

                  <div className="space-y-4 text-right">

                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold capitalize text-gray-600">

                      <CheckCircle2
                        size={16}
                      />

                      {notification.notification_type.replaceAll(
                        "_",
                        " "
                      )}

                    </div>

                    <div className="flex items-center justify-end gap-2 text-sm text-gray-500">

                      <Clock3
                        size={16}
                      />

                      {new Date(
                        notification.created_at
                      ).toLocaleString()}

                    </div>

                  </div>

                </div>

              </Card>
              </div>

            )

          )}

        </div>

      )}

    </main>

  );

};

export default NotificationsPage;
