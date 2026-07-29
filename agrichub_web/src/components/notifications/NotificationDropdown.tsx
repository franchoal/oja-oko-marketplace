import { Link } from "react-router-dom";
import {
  Bell,
  BellRing,
  Clock3,
  ChevronRight,
} from "lucide-react";

import { useNotifications } from "../../hooks/useNotifications";

const NotificationDropdown = () => {
  const { data } = useNotifications();

  const notifications = data?.results ?? [];

  const latestNotifications = notifications.slice(0, 5);

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  return (
    <div className="absolute right-0 mt-4 w-[420px] overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-2xl">

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 p-6 text-white">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <BellRing size={22} />

              <h3 className="text-xl font-bold">

                Notifications

              </h3>

            </div>

            <p className="mt-2 text-sm text-green-100">

              Stay updated with marketplace activity

            </p>

          </div>

          <div className="rounded-2xl bg-white/15 px-5 py-4 text-center backdrop-blur">

            <p className="text-3xl font-black">

              {unreadCount}

            </p>

            <p className="text-xs text-green-100">

              Unread

            </p>

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* EMPTY */}
      {/* ====================================================== */}

      {latestNotifications.length === 0 ? (

        <div className="px-8 py-16 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

            <Bell
              size={36}
              className="text-green-700"
            />

          </div>

          <h4 className="mt-6 text-xl font-bold text-gray-900">

            No Notifications

          </h4>

          <p className="mt-3 text-gray-500">

            You're all caught up.

          </p>

        </div>

      ) : (

        <>
          {/* ====================================================== */}
          {/* LIST */}
          {/* ====================================================== */}

          <div className="max-h-[480px] overflow-y-auto">

            {latestNotifications.map((notification) => (

              <div
                key={notification.id}
                className={`border-b border-gray-100 p-5 transition hover:bg-gray-50 ${
                  notification.is_read
                    ? "bg-white"
                    : "bg-green-50"
                }`}
              >

                <div className="flex gap-4">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      notification.is_read
                        ? "bg-gray-100"
                        : "bg-green-100"
                    }`}
                  >

                    <BellRing
                      size={22}
                      className={
                        notification.is_read
                          ? "text-gray-500"
                          : "text-green-700"
                      }
                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-2">

                      <h4 className="truncate font-bold text-gray-900">

                        {notification.title}

                      </h4>

                      {!notification.is_read && (

                        <span className="h-2.5 w-2.5 rounded-full bg-green-600" />

                      )}

                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">

                      {notification.message}

                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">

                      <Clock3 size={14} />

                      {new Date(
                        notification.created_at
                      ).toLocaleString()}

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* ====================================================== */}
          {/* FOOTER */}
          {/* ====================================================== */}

          <Link
            to="/notifications"
            className="flex items-center justify-between bg-gray-50 px-6 py-5 font-semibold text-green-700 transition hover:bg-green-50"
          >

            <span>

              View All Notifications

            </span>

            <ChevronRight size={20} />

          </Link>

        </>

      )}

    </div>
  );
};

export default NotificationDropdown;