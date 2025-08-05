import { Skill } from "./skill";

export interface Employee {
  id: number;
  fullName: string;
  email: string;
  position: string;
  skills: Skill[];
  startDate: Date;
}
