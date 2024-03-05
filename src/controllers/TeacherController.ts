import prisma from "../lib/client";
import type { Request, Response } from "express";
import { teacherSchema } from "../validators";
import type { TeacherInputType } from "../types";

class TeacherController {
  async getTeacher(req: Request, res: Response): Promise<void> {
    const { params } = req;
    if (params.id && params.id.length > 0) {
      const teacherId: number = parseInt(params.id);
      const teacher = await prisma.teacher.findUnique({
        where: {
          id: teacherId,
        },
      });
      res.send(teacher);
    } else {
      const teachers = await prisma.teacher.findMany({});
      res.send(teachers);
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
        res.status(400).send(`One of the teachers already exists`);
        return;
      }
      res.status(500).send("Internal Server Error");
    }
  }
}

export default TeacherController;
