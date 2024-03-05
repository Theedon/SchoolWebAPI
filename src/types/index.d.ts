interface BaseInterface {
  name: string;
}

export interface TeacherInputType extends BaseInterface {
  age: number;
  bio?: string;
  phone?: string;
  experience: number;
  email: string;
}

export interface StudentInputType extends BaseInterface {
  age: number;
  bio?: string;
  phone?: string;
  email: string;
  classroomId: number;
}

export interface ClassroomInputType extends BaseInterface {
  capacity?: number;
  location?: string;
  teacherId: number;
}
