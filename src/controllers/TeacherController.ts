/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prisma from "../lib/client";
import type { Request, Response } from "express";

class TeacherController {
  async createTeacher(req: Request, res: Response): Promise<void> {
    const { body } = req;
    if (Array.isArray(body) && body.length > 0) {
      await this.createMultipleTeachers(body, res);
    } else if (body?.name as boolean) {
      await this.createSingleTeacher(body, res);
    } else {
      res.status(400).send("Invalid Request Body");
    }
  }

  private async createSingleTeacher(body: any, res: Response): Promise<void> {
    const { name, age, bio, phone, experience } = body;
    const teacher = await prisma.teacher.create({
      data: {
        name,
        age,
        bio,
        phone,
        experience,
      },
    });
    res.send({ id: teacher.id });
  }

  private async createMultipleTeachers(
    teachersArray: any[],
    res: Response
  ): Promise<void> {
    const teachersInserted = await Promise.all(
      teachersArray.map(async (teacher) => {
        const { name, age, bio, phone, experience } = teacher;
        const createdTeacher = await prisma.teacher.create({
          data: {
            name,
            age,
            bio,
            phone,
            experience,
          },
        });
        return createdTeacher; // Return the created teacher
      })
    );
    res.send(teachersInserted.map((teacher) => ({ id: teacher.id })));
  }

  async getTeacher(req: Request, res: Response): Promise<void> {
    const { params } = req;
    if (params.id) {
      console.log(params.id);
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
}

export default TeacherController;
