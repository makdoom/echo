import { errorResponse } from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return errorResponse(res, message, statusCode, err.errors || null);
};
