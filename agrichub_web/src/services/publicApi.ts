import axios from "axios";

import { env } from "../config/env";

export const publicApi = axios.create({
  baseURL: env.apiBaseUrl,

  headers: {
    "Content-Type": "application/json",
  },
});