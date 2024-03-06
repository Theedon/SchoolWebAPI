/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import StudentController from "../controllers/StudentController";

const router = express.Router();

const studentController = new StudentController();

// GET handler for getting a single student by ID.
router.get("/:id", async (req, res) => {
  await studentController.getStudent(req, res);
});

// GET handler for getting all students.
router.get("/", async (req, res) => {
  await studentController.getStudents(req, res);
});

// GET handler for getting the name of teacher assigned to a student.
router.get("/:id/teacher", async (req, res) => {
  await studentController.getTeacherAssignedToStudent(req, res);
});

// POST handler for creating student(s).
router.post("/", async (req, res) => {
  await studentController.createStudent(req, res);
});

export default router;
