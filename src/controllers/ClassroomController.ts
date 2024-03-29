import prisma from "../lib/client";
import type { Request, Response } from "express";
import { classroomSchema } from "../validators";
import type { ClassroomInputType } from "../types";

/**
 * Class containing controller methods for CREATE AND READ operations on classrooms.
 */
class ClassroomController {
  /**
   * Gets a single classroom by ID.
   * @param req - The request object.
   * @param res - The response object.
   * @returns Promise resolving when classroom is fetched from db and response sent
   */
  async getClassroom(req: Request, res: Response): Promise<void> {
    const { params } = req;
    try {
      if (params.id && params.id.length > 0) {
        const classroomId: number = parseInt(params.id);
        const classroom = await prisma.classroom.findUnique({
          where: {
            id: classroomId,
          },
        });
        if (classroom === null) {
          res.status(404).send("Classroom Not Found");
          return;
        }
        res.send(classroom);
      }
    } catch (error: any) {
      console.error("Error Getting Classroom: ", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Gets all classrooms.
   * @param req - The request object.
   * @param res - The response object.
   * @returns Promise resolving when classrooms are fetched and response sent
   */
  async getClassrooms(req: Request, res: Response): Promise<void> {
    try {
      const classrooms = await prisma.classroom.findMany({});
      if (classrooms === null) {
        res.status(404).send("classrooms Not Found");
        return;
      }
      res.send(classrooms);
    } catch (error: any) {
      console.error("Error Getting Classrooms: ", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Creates a new classroom or classrooms from an array.
   * @param req - The request object.
   * @param res - The response object.
   * @returns Promise resolving when classroom(s) are created
   */
  async createClassroom(req: Request, res: Response): Promise<void> {
    const { body: classroomsData } = req;
    try {
      if (Array.isArray(classroomsData) && classroomsData.length > 0) {
        for (const singleClassroom of classroomsData) {
          classroomSchema.parse(singleClassroom);
        }
        await this.createMultipleClassrooms(classroomsData, res);
      } else if (
        typeof classroomsData === "object" &&
        classroomSchema.parse(classroomsData)
      ) {
        await this.createSingleClassroom(classroomsData, res);
      } else {
        res.status(400).send("Invalid Request Body");
      }
    } catch (error: unknown) {
      console.error("Error creating classroom: ", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Creates a single new classroom record in the database.
   * @param body - The classroom data to create.
   * @param res - The response object to send the result to.
   * @returns A promise that resolves when the record is created.
   */
  private async createSingleClassroom(
    body: ClassroomInputType,
    res: Response
  ): Promise<void> {
    try {
      const { name, capacity, location, teacherId } = body;
      const classroom = await prisma.classroom.create({
        data: {
          name,
          capacity,
          location,
          teacherId,
        },
      });
      res.send({ id: classroom.id });
    } catch (error: any) {
      console.error("Error creating classroom: ", error);
      if (error.code === "P2002") {
        res.status(400).send(`Classroom already exists`);
        return;
      }
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Creates multiple new classroom records in the database.
   * @param classroomsArray - An array of classroom data objects to create.
   * @param res - The response object to send the result to.
   * @returns A promise that resolves when all records are created.
   */
  private async createMultipleClassrooms(
    classroomsArray: ClassroomInputType[],
    res: Response
  ): Promise<void> {
    try {
      const classroomsInserted = await Promise.all(
        classroomsArray.map(async (classroom) => {
          const { name, capacity, location, teacherId } = classroom;
          const createdClassroom = await prisma.classroom.create({
            data: {
              name,
              capacity,
              location,
              teacherId,
            },
          });
          return createdClassroom;
        })
      );
      res.send(classroomsInserted.map((classroom) => ({ id: classroom.id })));
    } catch (error: any) {
      console.error("Error creating classrooms: ", error);
      if (error.code === "P2002") {
        res.status(400).send(`Classroom(s) already exist`);
        return;
      }
      res.status(500).send("Internal Server Error");
    }
  }
}

export default ClassroomController;
