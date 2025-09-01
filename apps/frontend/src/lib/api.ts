import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api/v1"
      : import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Response interceptor (always return only data)
api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — maybe token expired.");
    }
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
