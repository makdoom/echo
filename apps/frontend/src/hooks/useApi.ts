import api from "@/lib/api";
import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return api;
};
