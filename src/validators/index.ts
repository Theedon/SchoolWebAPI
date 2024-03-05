import { z } from "zod";

export const teacherSchema = z.object({
  name: z.string(),
  age: z.number().min(18),
  bio: z.string().optional(),
  phone: z.string().optional(),
  experience: z.number().positive(),
});

export const studentSchema = z.object({
  name: z.string(),
  age: z.number().min(18),
  bio: z.string().optional(),
  phone: z.string().optional(),
});

export const classroomSchema = z.object({
  name: z.string(),
  age: z.number().min(18),
  bio: z.string().optional(),
  phone: z.string().optional(),
  experience: z.number().positive(),
});
