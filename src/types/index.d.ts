interface BaseInterface {
  name: string;
}

export interface TeacherInputType extends BaseInterface {
  age: number;
  bio?: string;
  phone?: string;
  experience: number;
}

export interface StudentInputType extends BaseInterface {
  age: number;
  bio?: string;
  phone?: string;
}

export interface ClassroomInputType extends BaseInterface {
  capacity?: number;
  location?: string;
  teacherId: number;
}
