import { Link } from "react-router-dom";

const actions = [
  {
    title: "Add Product",
    description: "Create a new product listing.",
    to: "/products/create",
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    title: "Marketplace",
    description: "View all products in the marketplace.",
    to: "/products",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Edit Profile",
    description: "Update your farm information.",
    to: "/farmer/profile",
    color: "bg-gray-700 hover:bg-gray-800",
  },
];

const QuickActions = () => {
  return (
    <section className="mb-10">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
        Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className={`${action.color} rounded-2xl p-6 text-white transition`}
          >
            <h3 className="text-xl font-semibold">
              {action.title}
            </h3>

            <p className="mt-2 text-sm text-green-50">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;