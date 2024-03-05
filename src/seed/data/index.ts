import type {
  TeacherInputType,
  StudentInputType,
  ClassroomInputType,
} from "../../types";

export const Teachers: TeacherInputType[] = [
  {
    name: "Victor",
    age: 40,
    experience: 6,
    bio: "",
    phone: "08102942321",
    email: "victorma@email.com",
  },
  {
    name: "Alice",
    age: 35,
    experience: 8,
    bio: "",
    phone: "08012345678",
    email: "alice@example.com",
  },
  {
    name: "Bob",
    age: 38,
    experience: 5,
    bio: "",
    phone: "08098765432",
    email: "bob@example.com",
  },
  {
    name: "Emily",
    age: 37,
    experience: 7,
    bio: "",
    phone: "08055556666",
    email: "emily@example.com",
  },
  {
    name: "Jack",
    age: 42,
    experience: 9,
    bio: "",
    phone: "08011112222",
    email: "jack@example.com",
  },
];

export const Classrooms: ClassroomInputType[] = [
  {
    name: "Classroom 1",
    capacity: 20,
    location: "Ezeagu",
    teacherId: 1,
  },
  {
    name: "Classroom 2",
    capacity: 25,
    location: "Nsukka",
    teacherId: 2,
  },
  {
    name: "Classroom 3",
    capacity: 18,
    location: "Enugu East",
    teacherId: 3,
  },
  {
    name: "Classroom 4",
    capacity: 22,
    location: "Udi",
    teacherId: 4,
  },
  {
    name: "Classroom 5",
    capacity: 30,
    location: "Awgu",
    teacherId: 5,
  },
];

export const Students: StudentInputType[] = [
  {
    age: 10,
    name: "Tomi",
    bio: "",
    phone: "08012345678",
    email: "tomi@example.com",
    classroomId: 1,
  },
  {
    age: 8,
    name: "Chidi",
    bio: "",
    phone: "08098765432",
    email: "chidi@example.com",
    classroomId: 1,
  },
  {
    age: 9,
    name: "Fatima",
    bio: "",
    phone: "08055556666",
    email: "fatima@example.com",
    classroomId: 1,
  },
  {
    age: 7,
    name: "Ahmed",
    bio: "",
    phone: "08011112222",
    email: "ahmed@example.com",
    classroomId: 1,
  },
  {
    age: 11,
    name: "Ngozi",
    bio: "",
    phone: "08022223333",
    email: "ngozi@example.com",
    classroomId: 1,
  },
];
