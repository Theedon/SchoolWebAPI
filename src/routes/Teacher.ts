/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import TeacherController from "../controllers/TeacherController";

const router = express.Router();

const teacherController = new TeacherController();

router.get("/:id", async (req, res) => {
  await teacherController.getTeacher(req, res);
});

router.get("/", async (req, res) => {
  await teacherController.getTeachers(req, res);
});

router.post("/", async (req, res) => {
  await teacherController.createTeacher(req, res);
});

export default router;
