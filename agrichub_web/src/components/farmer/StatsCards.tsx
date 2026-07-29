const stats = [
  {
    title: "Total Products",
    value: "0",
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Available Products",
    value: "0",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Orders",
    value: "0",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Revenue",
    value: "₦0.00",
    color: "bg-purple-100 text-purple-700",
  },
];

const StatsCards = () => {
  return (
    <div className="mb-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <p className="text-sm font-medium text-gray-500">
            {stat.title}
          </p>

          <div
            className={`mt-4 inline-flex rounded-xl px-4 py-2 text-3xl font-bold ${stat.color}`}
          >
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;