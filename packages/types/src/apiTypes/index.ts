export type ApiSuccessResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: boolean;
  message: string;
  errors?: any;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
