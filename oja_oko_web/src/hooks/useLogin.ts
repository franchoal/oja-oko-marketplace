import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import { authService } from "../services/authService";
import { useAuthStore } from "../store/authStore";


export const useLogin = () => {

  const navigate = useNavigate();


  const login = useAuthStore(
    (state) => state.login
  );



  return useMutation({

    mutationFn: authService.login,


    onSuccess: (response) => {


      console.log("LOGIN RESPONSE");
      console.log(response);



      /*
      Save authenticated user
      and JWT tokens
      */

      login({

        user: response.user,

        access: response.access,

        refresh: response.refresh,

      });



      console.log("STORE AFTER LOGIN");

      console.log(
        useAuthStore.getState()
      );



      toast.success(
        "Login successful!"
      );



      /*
      Role based navigation

      Farmer:
      dashboard and product management

      Buyer:
      marketplace browsing

      */


      if (
        response.user.role === "farmer"
      ) {


        navigate(
          "/farmer/dashboard",
          {
            replace: true,
          }
        );


        return;

      }



      if (
        response.user.role === "buyer"
      ) {


        navigate(
          "/products",
          {
            replace: true,
          }
        );


        return;

      }



      /*
      Fallback if role is missing
      */

      navigate(
        "/",
        {
          replace: true,
        }
      );


    },



    onError: (error) => {


      if (
        axios.isAxiosError(error)
      ) {


        const message =
          error.response?.data?.detail ||
          "Invalid email or password.";


        toast.error(message);


        return;

      }



      toast.error(
        "Login failed."
      );


    },


  });

};