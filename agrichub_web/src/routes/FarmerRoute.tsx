import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import { useFarmerProfile } from "../hooks/useFarmerProfile";

const FarmerRoute = () => {
  const location = useLocation();

  const user = useAuthStore(
    (state) => state.user
  );

  /*
  ==========================================
  Authentication
  ==========================================
  */

  if (!user) {
    return (
      <Navigate
        to="/login/farmer"
        replace
      />
    );
  }

  /*
  ==========================================
  Farmer Only
  ==========================================
  */

  if (user.role !== "farmer") {
    return (
      <Navigate
        to="/products"
        replace
      />
    );
  }

  /*
  ==========================================
  Check Farmer Profile
  ==========================================
  */

  const {
    isLoading,
    isError,
    data: profile,
  } = useFarmerProfile();

  /*
  ==========================================
  Loading
  ==========================================
  */

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-5xl">
            🌾
          </div>

          <h2 className="text-xl font-semibold">
            Loading Farmer Portal...
          </h2>

          <p className="mt-2 text-gray-600">
            Please wait.
          </p>
        </div>
      </div>
    );
  }

  /*
  ==========================================
  No Farm Profile Yet

  Redirect every farmer to onboarding
  except when already on the profile page.
  ==========================================
  */

  if (
    (isError || !profile) &&
    location.pathname !==
      "/farmer/profile"
  ) {
    return (
      <Navigate
        to="/farmer/profile"
        replace
      />
    );
  }

  /*
  ==========================================
  Profile Exists

  Prevent returning to onboarding.
  ==========================================
  */

  if (
    profile &&
    location.pathname ===
      "/farmer/profile"
  ) {
    return (
      <Navigate
        to="/farmer/dashboard"
        replace
      />
    );
  }

  /*
  ==========================================
  Allow Access
  ==========================================
  */

  return <Outlet />;
};

export default FarmerRoute;