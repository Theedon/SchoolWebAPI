import express, { type Express } from "express";
import "dotenv/config";
import teacherRouter from "./routes/Teacher";
import studentRouter from "./routes/Student";
import classroomRouter from "./routes/Classroom";

const app: Express = express();

app.use(express.json());

app.use("/teachers", teacherRouter);

app.use("/students", studentRouter);

app.use("/classrooms", classroomRouter);

// Start Server
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
