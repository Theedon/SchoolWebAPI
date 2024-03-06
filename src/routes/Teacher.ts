/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import TeacherController from "../controllers/TeacherController";

const router = express.Router();

const teacherController = new TeacherController();

// GET handler for getting a single teacher by ID.
router.get("/:id", async (req, res) => {
  await teacherController.getTeacher(req, res);
});

// GET handler for getting all teachers.
router.get("/", async (req, res) => {
  await teacherController.getTeachers(req, res);
});

// GET handler for getting all students under a teacher.
router.get("/:id/students", async (req, res) => {
  await teacherController.getStudentsUnderTeacher(req, res);
});

// POST handler for creating teacher(s).
router.post("/", async (req, res) => {
  await teacherController.createTeacher(req, res);
});

export default router;
