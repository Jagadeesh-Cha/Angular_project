import { IEmployee } from './IEmployee';

export class ResolvedEmployeeList {
    constructor(public employeeList: IEmployee[], public error: any = null) {}
}
