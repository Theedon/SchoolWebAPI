/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import TeacherController from "../controllers/ClassroomController";

const router = express.Router();

const teacherController = new TeacherController();

router.get("/:id", async (req, res) => {
  await teacherController.getClassroom(req, res);
});

router.get("/", async (req, res) => {
  await teacherController.getClassrooms(req, res);
});

router.post("/", async (req, res) => {
  await teacherController.createClassroom(req, res);
});

export default router;
