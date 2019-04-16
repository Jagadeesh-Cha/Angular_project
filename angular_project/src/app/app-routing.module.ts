import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { AddEmployeeComponent } from './employee/add-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee.component';
import { EmployeeDetailsComponent} from './employee/employee-details.component'

const appRoutes: Routes = [
  { path: 'list',component: ListEmployeesComponent },
  { path: 'add',component: AddEmployeeComponent},
  { path: 'edit',component: EditEmployeeComponent},
  { path: 'edit/:id',component: AddEmployeeComponent},
  { path: 'employees/:id', component: EmployeeDetailsComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
