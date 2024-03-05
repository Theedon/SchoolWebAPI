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
    bio: "Experienced teacher with a passion for technology and innovation.",
    phone: "08102942321",
    email: "victorma@email.com",
  },
  {
    name: "Alice",
    age: 35,
    experience: 8,
    bio: "Dedicated educator specializing in literature and creative writing.",
    phone: "08012345678",
    email: "alice@example.com",
  },
  {
    name: "Bob",
    age: 38,
    experience: 5,
    bio: "Enthusiastic teacher with expertise in mathematics and problem-solving.",
    phone: "08098765432",
    email: "bob@example.com",
  },
  {
    name: "Emily",
    age: 37,
    experience: 7,
    bio: "Passionate educator fostering a love for science and discovery.",
    phone: "08055556666",
    email: "emily@example.com",
  },
  {
    name: "Jack",
    age: 42,
    experience: 9,
    bio: "Innovative teacher dedicated to nurturing critical thinking skills.",
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
    bio: "Enthusiastic learner with a keen interest in mathematics and science.",
    phone: "08012345678",
    email: "tomi@example.com",
    classroomId: 1,
  },
  {
    age: 8,
    name: "Chidi",
    bio: "Curious explorer eager to discover the wonders of the world.",
    phone: "08098765432",
    email: "chidi@example.com",
    classroomId: 1,
  },
  {
    age: 9,
    name: "Fatima",
    bio: "Creative thinker with a passion for art and storytelling.",
    phone: "08055556666",
    email: "fatima@example.com",
    classroomId: 1,
  },
  {
    age: 7,
    name: "Ahmed",
    bio: "Active participant in sports and outdoor activities.",
    phone: "08011112222",
    email: "ahmed@example.com",
    classroomId: 1,
  },
  {
    age: 11,
    name: "Ngozi",
    bio: "Future leader with a strong sense of community and responsibility.",
    phone: "08022223333",
    email: "ngozi@example.com",
    classroomId: 1,
  },
];
