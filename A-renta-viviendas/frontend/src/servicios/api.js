import axios from "axios";
import { obtenerToken } from "./authStorage.js";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});


api.interceptors.request.use(async (config) => {
  const token = await obtenerToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;
