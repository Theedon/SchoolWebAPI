import express, { type Express } from "express";
import "dotenv/config";

const app: Express = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.method);
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
