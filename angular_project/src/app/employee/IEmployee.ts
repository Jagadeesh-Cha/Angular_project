import { ISkill } from './ISkill';

export interface IEmployee {
    id: number;
    Name: string;
    Salary: string;
    DOB: string;
    skills: ISkill[];
    Photopath: string;
}
