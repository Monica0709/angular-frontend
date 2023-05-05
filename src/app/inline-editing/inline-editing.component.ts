import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-inline-editing',
  templateUrl: './inline-editing.component.html',
  styleUrls: ['./inline-editing.component.css']
})
export class InlineEditingComponent {
    employees: Employee[];
    constructor(private employeeService: EmployeeService,
      private router: Router,private toastr:ToastrService,){
        this.employees=[];  
    }
    ngOnInit(): void {
      this.getEmployees();
      console.log('UpdateEmployeeComponent initialized.');
    }
    private getEmployees(): void {
      this.employeeService.getEmployeesList().subscribe((data: Employee[]) => {
        this.employees = data;
        this.employees.forEach(element => {
          element['isEdit']=false;
        });
      });
      this.router.navigate(['inline-editing'])
  }
  getEmp(data:any){
    debugger;
    data.isEdit=true;
  }
  close(data:any){
    data.isEdit=true;
  }
  employeeDetails(id:number){
    this.router.navigate(['employee-details',id]);
  }
  updateEmployee(id: number){
    this.router.navigate(['update-employee',id]);
  }
  deleteEmployee(id:number){
    if(confirm('Are you sure to delete Employee'))
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
      this.getEmployees();
      this.toastr.success("Employee Deleted Succesfully");
    })
  }
  }
