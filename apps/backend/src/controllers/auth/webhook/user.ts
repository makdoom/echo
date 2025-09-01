import db from "@/db";
import { users } from "@/db/schema";
import { WebhookEvent } from "@clerk/express";
import { Request, Response } from "express";
import { Webhook, WebhookRequiredHeaders } from "svix";

export const userCreatedWebhook = async (req: Request, res: Response) => {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET)
      throw new Error("Webhook secret configured not properly");

    // Get the headers and body from the request
    const payload = JSON.stringify(req.body);
    const headers = req.headers;

    if (
      !headers["svix-id"] ||
      !headers["svix-timestamp"] ||
      !headers["svix-signature"]
    ) {
      throw new Error("Error occured, svix headers not found");
    }

    const svixHeaders: WebhookRequiredHeaders = {
      "svix-id": headers["svix-id"] as string,
      "svix-timestamp": headers["svix-timestamp"] as string,
      "svix-signature": headers["svix-signature"] as string,
    };

    // Create a new Svix instance with your secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let event: WebhookEvent;
    try {
      event = wh.verify(payload, svixHeaders) as WebhookEvent;
    } catch (err) {
      console.error("Svix webhook verification failed:", err);
      throw new Error("Webhook signature verification failed.");
    }

    // Process the event based on its type
    if (event.type == "user.created") {
      const { id, first_name, last_name, image_url, email_addresses } =
        event.data;
      await db.insert(users).values({
        userId: id,
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        email: email_addresses[0]?.email_address || "",
        imageURL: image_url,
      });
    }

    return res.status(200).json({ message: "New user created" });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
