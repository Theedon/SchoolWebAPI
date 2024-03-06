import express, { type Express } from "express";
import "dotenv/config";
import cors from "cors";
import teacherRouter from "./routes/Teacher";
import studentRouter from "./routes/Student";
import classroomRouter from "./routes/Classroom";

const app: Express = express();

// Enable CORS requests from all origins
app.use(cors());

// Home URL is introductory URL
app.get("/", (req, res) => {
  res.send("<h1>School Web API</h1>");
});

// Parses incoming requests with JSON payloads.
app.use(express.json());

app.use("/teachers", teacherRouter);

app.use("/students", studentRouter);

app.use("/classrooms", classroomRouter);

// Middleware to catch unhandled routes
app.use((_req, _res, next) => {
  const error = new Error("ROUTE NOT FOUND");
  // pass the errorr to the next middleware
  next(error);
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  res.status(err.status ?? 500);
  res.send({
    error: {
      message: err.message ?? "Internal Server Error",
    },
  });
});

// Start Server
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
