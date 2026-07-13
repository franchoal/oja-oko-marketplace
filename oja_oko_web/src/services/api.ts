import axios from "axios";

import { env } from "../config/env";
import { useAuthStore } from "../store/authStore";

export const api = axios.create({
  baseURL: env.apiBaseUrl,

  headers: {
    "Content-Type": "application/json",
  },
});


/**
 * Attach JWT token automatically
 * to authenticated requests only.
 *
 * Public routes:
 * - Login
 * - Register
 *
 * These must not receive old/stale tokens.
 */
api.interceptors.request.use(
  (config) => {

    const token =
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
      token &&
      !isPublicRoute
    ) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }


    return config;
  },


  (error) =>
    Promise.reject(error)
);