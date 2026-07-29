import { useAuthStore } from "../../store/authStore";

const DashboardHeader = () => {
  const user = useAuthStore((state) => state.user);

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };

  return (
    <div className="mb-10">
      <h1 className="text-4xl font-bold text-gray-900">
        {greeting()},{" "}
        {user?.first_name || "Farmer"} 👋
      </h1>

      <p className="mt-3 text-lg text-gray-600">
        Welcome to your farmer dashboard.
        Manage your products, monitor sales,
        and grow your business from one place.
      </p>
    </div>
  );
};

export default DashboardHeader;