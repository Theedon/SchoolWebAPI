import express, { type Express } from "express";
import "dotenv/config";
import router from "./routes/Teacher";

const app: Express = express();

app.use(express.json());

app.use("/teachers", router);

// Start Server
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
