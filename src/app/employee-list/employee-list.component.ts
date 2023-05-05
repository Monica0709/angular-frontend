import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{
  employees: Employee[];
  page: number = 1;
  pageSize: number = 10;
  sortDirection: string = 'asc';
  sortProperty: string = 'name';
  searchTerm = '';
  constructor(private employeeService: EmployeeService,
    private router: Router,private toastr:ToastrService,){
      this.employees=[];  
  }
  ngOnInit(): void {
    this.getEmployees();
    console.log('UpdateEmployeeComponent initialized.');
  }
  get filteredEmployees() {
    return this.employees.filter(employee =>
      // For Sorting with Case-sentivity
      /*
      if (a[this.sortProperty] > b[this.sortProperty]) {
      return this.sortDirection === 'asc' ? 1 : -1;
      }
      if (a[this.sortProperty] < b[this.sortProperty]) {
      return this.sortDirection === 'asc' ? -1 : 1;
      }
      return 0;
      });
      */
     // For Sorting without Case-sentivity
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  sortEmployees() {
    this.employees.sort((a, b) => {
      const aValue = a[this.sortProperty].toLowerCase();
      const bValue = b[this.sortProperty].toLowerCase();
      return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  }
  private getEmployees(): void {
    this.employeeService.getEmployeesList().subscribe((data: Employee[]) => {
      this.employees = data;
      this.sortEmployees();
      this.employees.forEach(element => {
        element['isEdit']=false;
      });
    });
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