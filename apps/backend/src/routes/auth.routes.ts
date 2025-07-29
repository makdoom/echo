import { Router, type Router as ExpressRouter } from "express";
import { userCreatedWebhook } from "@/webhook/user";
import bodyParser from "body-parser";

const authRouter: ExpressRouter = Router();

authRouter.post(
  "/webhook/register",
  bodyParser.raw({ type: "application/json" }),
  userCreatedWebhook
);

export default authRouter;
