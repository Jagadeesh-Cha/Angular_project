import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { AddEmployeeComponent } from './employee/add-employee.component';
import { EmployeeService } from './employee/employee.service';
import { EmployeeFilterPipe } from './employee/employee-filter.pipe';
import { EmployeeListResolverService } from './employee/employee-list-resolver.service';
import { EditEmployeeComponent } from './employee/edit-employee.component';
import { EmployeeDetailsComponent} from './employee/employee-details.component';
import { from } from 'rxjs';

const appRoutes: Routes = [
  {
    path: 'list',
    component: ListEmployeesComponent,
    resolve: { employeeList: EmployeeListResolverService }
  },
  {
    path: 'add',
    component: AddEmployeeComponent
  },
  {
    path: 'edit',
    component: EditEmployeeComponent
  },
  {
    path: 'edit/:id',
    component: AddEmployeeComponent
  },
  {
    path: 'employees/:id', component: EmployeeDetailsComponent
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    AddEmployeeComponent,
    EmployeeFilterPipe,
    EditEmployeeComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmployeeService,    EmployeeListResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
