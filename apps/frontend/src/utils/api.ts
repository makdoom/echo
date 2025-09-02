import type { ApiResponse, ApiSuccessResponse, ApiErrorResponse } from "@repo/types/src/apiTypes";

/**
 * Type guard to check if API response is successful
 */
export const isApiSuccess = <T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> => {
  return response.success === true;
};

/**
 * Type guard to check if API response is an error
 */
export const isApiError = <T>(response: ApiResponse<T>): response is ApiErrorResponse => {
  return response.success === false;
};

/**
 * Utility function to handle API responses with proper error handling
 */
export const handleApiResponse = <T>(
  response: ApiResponse<T>,
  onSuccess: (data: T) => void,
  onError?: (error: ApiErrorResponse) => void
) => {
  if (isApiSuccess(response)) {
    onSuccess(response.data);
  } else if (isApiError(response)) {
    if (onError) {
      onError(response);
    } else {
      console.error("API Error:", response.message);
    }
  }
};

/**
 * Extract data from successful API response or throw error
 */
export const extractApiData = <T>(response: ApiResponse<T>): T => {
  if (isApiSuccess(response)) {
    return response.data;
  } else {
    throw new Error(response.message || "API request failed");
  }
};
