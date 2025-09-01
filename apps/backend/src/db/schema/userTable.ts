import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  userId: varchar("userId", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: text("email").notNull().unique(),
  imageURL: text("imageURL"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
