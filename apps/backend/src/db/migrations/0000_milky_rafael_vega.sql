CREATE TABLE "users" (
	"userId" varchar(256) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"email" text NOT NULL,
	"imageURL" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
