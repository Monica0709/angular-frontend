import { Component, OnInit} from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{
  employee: Employee=new Employee();
  constructor(private employeeService: EmployeeService,
    private router: Router,private toastr:ToastrService,private http:HttpClient ){}
  ngOnInit():void{}
  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe(data =>{
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error));
  }
  goToEmployeeList(){
    this.router.navigate(['/employees']); 
  }
  onSubmit(){
    console.log(this.employee);
    this.toastr.success("Employee Added Succesfully");
    this.saveEmployee();
  }
  createForm=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(4),Validators.pattern('[a-zA-Z]*')]),
    email:new FormControl('',[Validators.required]),
    number:new FormControl(''),
    gender:new FormControl('',[Validators.required]),
    country:new FormControl('',[Validators.required]),
    dob:new FormControl(null,[Validators.required]),
    interests: new FormControl([]),
  })
  get name():FormControl{
    return this.createForm.get("name") as FormControl  ;
  }
  get email():FormControl{
    return this.createForm.get("email") as FormControl;
  }
  get number():FormControl{
    return this.createForm.get('number') as FormControl;
  }
  get gender():FormControl{
    return this.createForm.get('gender') as FormControl;
  }
  get country():FormControl{
    return this.createForm.get('country') as FormControl;
  }
  get dob():FormControl{
    return this.createForm.get('dob') as FormControl;
  }
  get interests():FormControl{
    return this.createForm.get("interests") as FormControl  ;
  }
  image(id:number){
    this.router.navigate(['image']);
  }
  }
