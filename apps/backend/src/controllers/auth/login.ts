import { successResponse } from "@/utils/response";
import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, sessionId } = getAuth(req);

    return successResponse(
      res,
      { userId, sessionId },
      "User fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};
