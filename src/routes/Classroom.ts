/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import ClassroomController from "../controllers/ClassroomController";

const router = express.Router();

const classroomController = new ClassroomController();

// GET handler for getting a single classroom by ID.
router.get("/:id", async (req, res) => {
  await classroomController.getClassroom(req, res);
});

// GET handler for getting all classrooms.
router.get("/", async (req, res) => {
  await classroomController.getClassrooms(req, res);
});

// POST handler for creating classroom(s).
router.post("/", async (req, res) => {
  await classroomController.createClassroom(req, res);
});

export default router;
