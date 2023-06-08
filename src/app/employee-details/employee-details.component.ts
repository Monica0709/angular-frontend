import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id!: number;
  employee: Employee;
  retrievedImage: any;
  imageDataUrl!: string;
  constructor(private route:ActivatedRoute, private employeeService:EmployeeService, private sanitizer: DomSanitizer,private http: HttpClient){
    this.employee = new Employee();
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.employee=new Employee();
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee=data;
    })
  }
}
