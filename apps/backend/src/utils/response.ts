import { Response } from "express";

export const successResponse = (
  res: Response,
  data: any,
  message = "Success",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message = "Something went wrong",
  statusCode = 500,
  errors: any = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};
