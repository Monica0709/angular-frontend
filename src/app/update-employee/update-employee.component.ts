import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  id!: number;
  employee:Employee=new Employee();
  constructor(private employeeService:EmployeeService,private toastr:ToastrService, 
    private route:ActivatedRoute, private router :Router,private http:HttpClient,){}
  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee=data;
    },error => {console.log(error); this.toastr.error('Failed to fetch employee data'); });
  }
  onSubmit(){
    console.log(this.employee)
    this.employeeService.updateEmployee(this.id,this.employee).subscribe(data =>{
      this.goToEmployeeList();
    }, error => console.log(error));
  }
  
  goToEmployeeList(){
    this.toastr.success("Employee Updated Succesfully");
    this.router.navigate(['/employees']);
  }
  createForm=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(4),Validators.pattern('[a-zA-Z]*')]),
    email:new FormControl(''),
    number:new FormControl(''),
    gender:new FormControl('',[Validators.required]),
    country:new FormControl('',[Validators.required]),
    dob:new FormControl('',[Validators.required])
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
 
  }
