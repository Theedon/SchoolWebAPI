import { z } from "zod";

export const teacherSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  experience: z.number().positive(),
});

export const studentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  classroomId: z.number().positive(),
});

export const classroomSchema = z.object({
  name: z.string(),
  capacity: z.number().positive().optional(),
  location: z.string().optional(),
  teacherId: z.number().positive(),
});
