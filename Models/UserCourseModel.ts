import {CourseModel} from './CourseModel';

export interface UserCourse {
  id: number;
  courseId: number;
  userAccountId: number;
  status: string;
  mark: number;
  course: CourseModel;
}
