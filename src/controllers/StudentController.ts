import prisma from "../lib/client";
import type { Request, Response } from "express";
import { studentSchema } from "../validators";
import type { StudentInputType } from "../types";

class StudentController {
  async getStudent(req: Request, res: Response): Promise<void> {
    const { params } = req;
    try {
      if (params.id && params.id.length > 0) {
        const studentId: number = parseInt(params.id);
        const student = await prisma.student.findUnique({
          where: {
            id: studentId,
          },
        });
        if (student === null) {
          res.status(404).send("Student Not Found");
          return;
        }
        res.send(student);
      }
    } catch (error: any) {
      console.error("Error Getting Student: ", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async getStudents(req: Request, res: Response): Promise<void> {
    try {
      const students = await prisma.student.findMany({});
      if (students === null) {
        res.status(404).send("students Not Found");
        return;
      }
      res.send(students);
    } catch (error: any) {
      console.error("Error Getting Students: ", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async createStudent(req: Request, res: Response): Promise<void> {
    const { body: studentsData } = req;
    try {
      if (Array.isArray(studentsData) && studentsData.length > 0) {
        for (const singleStudent of studentsData) {
          studentSchema.parse(singleStudent);
        }
        await this.createMultipleStudents(studentsData, res);
      } else if (
        typeof studentsData === "object" &&
        studentSchema.parse(studentsData)
      ) {
        await this.createSingleStudent(studentsData, res);
      } else {
        res.status(400).send("Invalid Request Body");
      }
    } catch (error: unknown) {
      console.error("Error creating student: ", error);
      res.status(500).send("Internal Server Error");
    }
  }

  private async createSingleStudent(
    body: StudentInputType,
    res: Response
  ): Promise<void> {
    try {
      const { name, email, age, bio, phone, classroomId } = body;
      const student = await prisma.student.create({
        data: {
          name,
          email,
          age,
          bio,
          phone,
          classroomId,
        },
      });
      res.send({ id: student.id });
    } catch (error: any) {
      console.error("Error creating student: ", error);
      if (error.code === "P2002") {
        res.status(400).send(`User with email '${body.email}' already exists`);
        return;
      }
      res.status(500).send("Internal Server Error");
    }
  }

  private async createMultipleStudents(
    studentsArray: StudentInputType[],
    res: Response
  ): Promise<void> {
    try {
      const studentsInserted = await Promise.all(
        studentsArray.map(async (student) => {
          const { name, email, age, bio, phone, classroomId } = student;
          const createdStudent = await prisma.student.create({
            data: {
              name,
              email,
              age,
              bio,
              phone,
              classroomId,
            },
          });
          return createdStudent;
        })
      );
      res.send(studentsInserted.map((student) => ({ id: student.id })));
    } catch (error: any) {
      console.error("Error creating students: ", error);
      if (error.code === "P2002") {
        res.status(400).send(`Student(s) already exist`);
        return;
      }
      res.status(500).send("Internal Server Error");
    }
  }
}

export default StudentController;
