import axios, { AxiosError, type AxiosResponse } from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api/v1"
      : import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  <T>(res: AxiosResponse<T>) => {
    return res;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — maybe token expired.");
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
