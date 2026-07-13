import {
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuthStore } from "../store/authStore";


const FarmerRoute = () => {

  const user = useAuthStore(
    (state) => state.user
  );


  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  if (user.role !== "farmer") {

    return (
      <Navigate
        to="/products"
        replace
      />
    );

  }


  return <Outlet />;

};


export default FarmerRoute;