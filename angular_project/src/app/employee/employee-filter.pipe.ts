import { PipeTransform, Pipe } from '@angular/core';
import { IEmployee } from './IEmployee';

@Pipe({
    name: 'employeeFilter',
    pure: false
})
export class EmployeeFilterPipe implements PipeTransform {
    private counter = 0;
    transform(employees: IEmployee[], searchTerm: string): IEmployee[] {
        this.counter++;
        console.log('Filter pipe executed count ' + this.counter);
        if (!employees || !searchTerm) {
            return employees;
        }

        return employees.filter(employee =>
            employee.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}

