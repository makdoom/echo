import cors from "cors";
import express from "express";

const app = express();
const port = 8000;

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (_, res) => {
  res.json({ message: "Hello world", statusCode: 200 });
});

app.get("/health", (_, response) => {
  response.json({ message: "All Ok", statusCode: 200 });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
