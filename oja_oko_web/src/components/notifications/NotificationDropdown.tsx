import { Link } from "react-router-dom";

import { useNotifications } from "../../hooks/useNotifications";

const NotificationDropdown = () => {
  const {
    data,
  } = useNotifications();

  const notifications = data?.results ?? [];

  const latestNotifications = notifications.slice(0, 5);

  return (
    <div className="absolute right-0 mt-3 w-96 overflow-hidden rounded-xl border bg-white shadow-xl">

      <div className="border-b px-5 py-4">
        <h3 className="text-lg font-bold">
          Notifications
        </h3>
      </div>

      {latestNotifications.length === 0 ? (

        <div className="p-6 text-center text-gray-500">
          No notifications
        </div>

      ) : (

        <>
          <div className="max-h-96 overflow-y-auto">

            {latestNotifications.map((notification) => (

              <div
                key={notification.id}
                className={`border-b px-5 py-4 ${
                  notification.is_read
                    ? "bg-white"
                    : "bg-green-50"
                }`}
              >
                <h4 className="font-semibold">
                  {notification.title}
                </h4>

                <p className="mt-1 text-sm text-gray-600">
                  {notification.message}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {new Date(
                    notification.created_at
                  ).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

          <Link
            to="/notifications"
            className="block bg-gray-50 px-5 py-3 text-center font-semibold text-green-700 hover:bg-gray-100"
          >
            View All Notifications
          </Link>
        </>

      )}

    </div>
  );
};

export default NotificationDropdown;