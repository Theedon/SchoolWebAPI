import prisma from "../lib/client";
import type { Request, Response } from "express";
import { teacherSchema } from "../validators";
import type { TeacherInputType } from "../types";

/**
 * Class containing controller methods for CREATE AND READ operations on Teachers.
 */
class TeacherController {
  /**
   * Gets a teacher by ID.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves when the teacher has been fetched and response sent
   */
  async getTeacher(req: Request, res: Response): Promise<void> {
    const { params } = req;
    try {
      if (params.id && params.id.length > 0) {
        const teacherId: number = parseInt(params.id);
        const teacher = await prisma.teacher.findUnique({
          where: {
            id: teacherId,
          },
        });
        if (teacher === null) {
          res.status(404).send("Teacher Not Found");
          return;
        }
        res.send(teacher);
      }
    } catch (error: any) {
      console.error("Error Getting Teacher: ", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Gets all teachers from the database.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves when the teachers have been fetched and response sent
   */
  async getTeachers(req: Request, res: Response): Promise<void> {
    try {
      const teachers = await prisma.teacher.findMany({});
      if (teachers === null) {
        res.status(404).send("Teachers Not Found");
        return;
      }
      res.send(teachers);
    } catch (error: any) {
      console.error("Error Getting Teachers: ", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async createTeacher(req: Request, res: Response): Promise<void> {
    const { body: teachersData } = req;
    try {
      if (Array.isArray(teachersData) && teachersData.length > 0) {
        for (const singleTeacher of teachersData) {
          teacherSchema.parse(singleTeacher);
        }
        await this.createMultipleTeachers(teachersData, res);
      } else if (
        typeof teachersData === "object" &&
        teacherSchema.parse(teachersData)
      ) {
        await this.createSingleTeacher(teachersData, res);
      } else {
        res.status(400).send("Invalid Request Body");
      }
    } catch (error: unknown) {
      console.error("Error creating teacher: ", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Gets all students for a given teacher ID from the database.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves when the students under a teacher have been fetched and response sent
   */
  async getStudentsUnderTeacher(req: Request, res: Response): Promise<void> {
    const { params } = req;
    try {
      if (params.id && params.id.length > 0) {
        const teacherId: number = parseInt(params.id);
        const teacherToStudents = await prisma.teacher.findUnique({
          where: {
            id: teacherId,
          },
          include: {
            classrooms: {
              include: {
                students: true,
              },
            },
          },
        });
        const students = teacherToStudents?.classrooms.flatMap(
          (classroom) => classroom.students
        );
        if (students === null) {
          res.status(404).send("Students Not Found");
          return;
        }
        res.send(students);
      }
    } catch (error: any) {
      console.error("Error Getting Students: ", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Creates a single teacher record in the database.
   * @param body - The teacher data to create.
   * @param res - The response object.
   * @returns A promise that resolves when the teacher is created.
   */
  private async createSingleTeacher(
    body: TeacherInputType,
    res: Response
  ): Promise<void> {
    try {
      const { name, email, age, bio, phone, experience } = body;
      const teacher = await prisma.teacher.create({
        data: {
          name,
          email,
          age,
          bio,
          phone,
          experience,
        },
      });
      res.send({ id: teacher.id });
    } catch (error: any) {
      console.error("Error creating teacher: ", error);
      if (error.code === "P2002") {
        res.status(400).send(`User with email '${body.email}' already exists`);
        return;
      }
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Creates multiple teacher records in the database.
   * @param teachersArray - The array of teacher data to create.
   * @param res - The response object.
   * @returns A promise that resolves when the teachers are created.
   */
  private async createMultipleTeachers(
    teachersArray: TeacherInputType[],
    res: Response
  ): Promise<void> {
    try {
      const teachersInserted = await Promise.all(
        teachersArray.map(async (teacher) => {
          const { name, email, age, bio, phone, experience } = teacher;
          const createdTeacher = await prisma.teacher.create({
            data: {
              name,
              email,
              age,
              bio,
              phone,
              experience,
            },
          });
          return createdTeacher;
        })
      );
      res.send(teachersInserted.map((teacher) => ({ id: teacher.id })));
    } catch (error: any) {
      console.error("Error creating teachers: ", error);
      if (error.code === "P2002") {
        res.status(400).send(`Teacher(s) already exist`);
        return;
      }
      res.status(500).send("Internal Server Error");
    }
  }
}

export default TeacherController;
