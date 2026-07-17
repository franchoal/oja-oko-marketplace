import { Card } from "../../components/ui";

import { useNotifications } from "../../hooks/useNotifications";

const NotificationsPage = () => {
  const {
    data: notifications = [],
    isLoading,
    isError,
  } = useNotifications();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <p>Loading notifications...</p>
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

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Notifications
        </h1>

        <p className="mt-2 text-gray-600">
          Stay updated with your marketplace activity.
        </p>

      </div>

      {notifications.length === 0 ? (

        <Card className="p-10 text-center">

          <h2 className="text-2xl font-semibold">
            No notifications
          </h2>

        </Card>

      ) : (

        <div className="space-y-5">

          {notifications.map((notification) => (

            <Card
              key={notification.id}
              className={`border-l-4 ${
                notification.is_read
                  ? "border-gray-300"
                  : "border-green-600"
              }`}
            >

              <h2 className="text-lg font-bold">
                {notification.title}
              </h2>

              <p className="mt-2 text-gray-600">
                {notification.message}
              </p>

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

          ))}

        </div>

      )}

    </main>
  );
};

export default NotificationsPage;