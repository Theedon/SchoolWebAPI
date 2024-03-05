/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import StudentController from "../controllers/StudentController";

const router = express.Router();

const studentController = new StudentController();

router.get("/:id", async (req, res) => {
  await studentController.getStudent(req, res);
});

router.get("/", async (req, res) => {
  await studentController.getStudents(req, res);
});

router.post("/", async (req, res) => {
  await studentController.createStudent(req, res);
});

export default router;
