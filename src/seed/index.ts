import { Classrooms, Students, Teachers } from "./data";
import prisma from "../lib/client";

async function main(): Promise<void> {
  // insert Teachers data
  for (const teacher of Teachers) {
    await prisma.teacher.create({
      data: teacher,
    });
  }

  const TEACHER_ID = await prisma.teacher.findFirst();
  for (const classroom of Classrooms) {
    await prisma.classroom.create({
      data: {
        teacherId: TEACHER_ID?.id ?? 1,
        name: classroom.name,
        capacity: classroom.capacity,
        location: classroom.location,
      },
    });
  }

  const CLASSROOM_ID = await prisma.classroom.findFirst();
  for (const student of Students) {
    await prisma.student.create({
      data: {
        age: student.age,
        name: student.name,
        bio: student.bio,
        classroomId: CLASSROOM_ID?.id ?? 1,
        email: student.email,
        phone: student.phone,
      },
    });
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    console.log(
      "***💃🕺💫🎶🔥✨👯‍♀️👯‍♂️💃🕺SEEDING FINISHED!💃🕺💫🎶🔥✨👯‍♀️👯‍♂️💃🕺***"
    );
    prisma
      .$disconnect()
      .then(() => console.log("prisma connection terminated successfully"))
      .catch(() => console.error("error disconnecting prisma instance"));
  });
