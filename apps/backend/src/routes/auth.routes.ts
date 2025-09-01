import { Router, type Router as ExpressRouter } from "express";
import { clerkMiddleware } from "@clerk/express";
import bodyParser from "body-parser";
import { userCreatedWebhook } from "@/controllers/auth/webhook/user";
import { loginUser } from "@/controllers/auth/login";

const authRouter: ExpressRouter = Router();

authRouter.post(
  "/webhook/register",
  bodyParser.raw({ type: "application/json" }),
  userCreatedWebhook
);

authRouter.post("/login", clerkMiddleware(), loginUser);

export default authRouter;
