import cors from "cors";
import express from "express";
import helmet from "helmet";
import authRouter from "./routes/auth.routes";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);

app.get("/", (_, res) => {
  res.json({ message: "Hello world", statusCode: 200 });
});

app.get("/health", (_, response) => {
  response.json({ message: "All ok", statusCode: 200 });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
