import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const UserMenu = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="font-medium">{user.email}</p>
        <p className="text-sm text-gray-500 capitalize">
          {user.role}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;