import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-excell',
  templateUrl: './excell.component.html',
  styleUrls: ['./excell.component.css']
})
export class ExcellComponent implements OnInit{
  fileToUpload: File | null = null;
  ngOnInit(): void {
    
  }
  constructor( private router: Router,private http: HttpClient,private employeeService:EmployeeService){}
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.employeeService.uploadExcel(file).subscribe(
        (employees: Employee[]) => {
          console.log('Uploaded employees:', employees);
        },
        (error) => {
          console.error('Error uploading file:', error);
          // Handle the error
        }
      );
    }
  }
  goToEmployeeList(){
    this.router.navigate(['/employees']); 
  }
  downloadSampleExcel(): void {
    const data: Array<any> = [
      ['Name', 'Email', 'Number', 'DOB', 'Gender', 'Country'],
      ['John Doe', 'john@gmail.com', '1234567890', '1985-05-20', 'M', 'USA'],
      ['Jane Smith', 'jane@gmail.com', '9876543210', '1990-10-15', 'F', 'CAN'],
      ['Bob Johnson', 'bob@gmail.com', '5678901234', '1988-03-25', 'M', 'IND']
    ];
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    XLSX.writeFile(workbook, 'sample.xlsx');
  }
  
}
