import axios from "axios";

import { env } from "../config/env";
import { useAuthStore } from "../store/authStore";


export const api = axios.create({

  baseURL: env.apiBaseUrl,

});



/**
 * Attach JWT token automatically
 */

api.interceptors.request.use(

  (config) => {


    const accessToken =
      useAuthStore.getState().accessToken;



    const publicRoutes = [

      "/accounts/login/",

      "/accounts/register/",

    ];



    const isPublicRoute =
      publicRoutes.some((route) =>
        config.url?.includes(route)
      );



    if (
      accessToken &&
      !isPublicRoute
    ) {

      config.headers.Authorization =
        `Bearer ${accessToken}`;

    }


    /**
     * IMPORTANT:
     *
     * Do not set Content-Type globally.
     *
     * Axios must decide:
     *
     * JSON requests:
     * application/json
     *
     * File uploads:
     * multipart/form-data
     *
     */

    if (
      config.data instanceof FormData
    ) {

      delete config.headers["Content-Type"];

    }


    return config;

  },


  (error) => {

    return Promise.reject(error);

  }

);