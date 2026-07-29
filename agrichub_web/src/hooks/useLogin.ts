import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import { authService } from "../services/authService";
import { farmerService } from "../services/farmerService";

import { useAuthStore } from "../store/authStore";


export const useLogin = () => {

  const navigate = useNavigate();


  const login = useAuthStore(
    (state) => state.login
  );


  return useMutation({

    mutationFn: authService.login,


    onSuccess: async (response) => {


      /*
      ==========================================
      Save Authentication
      ==========================================
      */


      login({

        user: response.user,

        access: response.access,

        refresh: response.refresh,

      });



      toast.success(
        "Login successful!"
      );



      /*
      ==========================================
      FARMER FLOW

      Login
        ↓
      Check profile
        ↓
      Exists → Dashboard
        ↓
      Missing → Create Profile

      ==========================================
      */


      if (
        response.user.role === "farmer"
      ) {


        try {


          await farmerService.getProfile();



          navigate(
            "/farmer/dashboard",
            {
              replace:true,
            }
          );



        } catch (error) {



          if (

            axios.isAxiosError(error)

            &&

            error.response?.status === 404

          ) {


            navigate(
              "/farmer/profile",
              {
                replace:true,
              }
            );


            return;

          }



          console.error(
            "Farmer profile verification failed",
            error
          );


          toast.error(
            "Unable to verify farmer profile."
          );


        }


        return;

      }



      /*
      ==========================================
      BUYER FLOW
      ==========================================
      */


      if (
        response.user.role === "buyer"
      ) {


        navigate(
          "/products",
          {
            replace:true,
          }
        );


        return;

      }



      /*
      ==========================================
      UNKNOWN ROLE
      ==========================================
      */


      navigate(
        "/",
        {
          replace:true,
        }
      );


    },



    onError: (error) => {


      if (
        axios.isAxiosError(error)
      ) {


        const message =

          error.response?.data?.detail

          ||

          "Invalid email or password.";


        toast.error(
          message
        );


        return;

      }



      toast.error(
        "Login failed."
      );


    },


  });

};