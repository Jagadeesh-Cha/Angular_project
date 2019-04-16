import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';
import { ISkill } from './ISkill';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public addEmployeeForm: NgForm;
  previewPhoto = false;
  panelTitle: string;
  employeeForm: FormGroup;
  employee: IEmployee;

  validationMessages = {
    
  };

  formErrors={};
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router) { }
  
    togglePhotoPreview() {
      this.previewPhoto = !this.previewPhoto;
    }
    

  ngOnInit() {
    this.employeeForm = this.fb.group({
      Name: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      Salary : ['',[Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      DOB : ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      skills: this.fb.array([
      this.addSkillFormGroup()
      ]),
      Photopath: [''],
    });

    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.getEmployee(empId);
      } else {
        this.employee = {
          id: null,
          Name: '',
          Salary: '',
          DOB: '',
          skills: [],
          Photopath: ''
        };
      }
    });

  }

  getEmployee(id: number){
    this.employeeService.getEmployee(id).subscribe(
       (employee: IEmployee) =>this.editEmployee(employee),
       (err: any ) => console.log(err)
       );

  }

  logKeyValuePairs(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
      } else {
        console.log('Key = ' + key + ' && Value = ' + abstractControl.value);
      }
    });
  }

  onLoadDataClick() :void{
  this.logKeyValuePairs(this.employeeForm);
  }

  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      Name: employee.Name,
      Salary: employee.Salary,
      DOB: employee.DOB,
      Photopath: employee.Photopath

      });
      this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));
  }

  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        proficiency: s.proficiency
      }));
    });
  
    return formArray;
  }

  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }

  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }

  logValidationErrors(group: FormGroup = this.employeeForm) :void{
    Object.keys(group.controls).forEach((key:  string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '') ) {
          const messages = this.validationMessages[key];

        for (const errorKey in abstractControl.errors){
          if(errorKey){
            this.formErrors[key] += messages[errorKey] + '';
          }
        }
        }
        if (abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
        }

        if (abstractControl instanceof FormArray){
         for(const control of abstractControl.controls){
           if(control instanceof FormGroup)
         {this.logValidationErrors(control);}
         }  
        }
    });
  }

  

  onSubmit(): void {
    this.mapFormValuesToEmployeeModel();
  
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => this.router.navigate(['list']),
        (err: any) => console.log(err)
      );
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(
        () => this.router.navigate(['list']),
        (err: any) => console.log(err)
      );
    }
  }

  mapFormValuesToEmployeeModel() {
    this.employee.Name = this.employeeForm.value.Name;
    this.employee.Salary = this.employeeForm.value.Salary;
    this.employee.DOB = this.employeeForm.value.DOB;
    this.employee.skills = this.employeeForm.value.skills;
    this.employee.Photopath = this.employeeForm.value.Photopath;
  }

  

}
