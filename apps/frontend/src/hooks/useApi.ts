import api from "@/lib/api";
import { useAuth } from "@clerk/clerk-react";
import type { ApiResponse, ApiErrorResponse } from "@repo/types/src/apiTypes";
import { AxiosError } from "axios";

export const useRequest = () => {
  const { getToken } = useAuth();

  const authRequest = {
    get: async <T>(url: string, config?: object): Promise<ApiResponse<T>> => {
      const token = await getToken();
      const res = await api.get<ApiResponse<T>>(url, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(config as any)?.headers,
        },
      });
      return res.data;
    },
    post: async <T>(
      url: string,
      data?: unknown,
      config?: object
    ): Promise<ApiResponse<T>> => {
      const token = await getToken();
      const res = await api.post<ApiResponse<T>>(url, data, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(config as any)?.headers,
        },
      });

      return res.data;
    },
  };

  return authRequest;
};
