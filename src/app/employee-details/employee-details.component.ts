import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId!:number;
  id!: number;
  employee: Employee;
  retrievedImage: any;
  imageUrl: string | null = null;
  imageDataUrl!: string;
  errorMessage: string | null = null;
  constructor(private route:ActivatedRoute, private employeeService:EmployeeService, private sanitizer: DomSanitizer,private http: HttpClient){
    this.employee = new Employee();
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.employee=new Employee();
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee=data;
      this.getEmployeeImage(this.employee.id); 
    })
  }
  getEmployeeImage(employeeId: number): void {
    this.employeeService.getEmployeeImage(employeeId).subscribe(
      (imageBlob: Blob) => {
        const imageUrl: string = URL.createObjectURL(imageBlob);
        this.imageUrl = imageUrl;
        this.errorMessage = null; // Reset the error message
      },
      (error: HttpErrorResponse) => {
        this.imageUrl = null; // Set the image URL to null
        if (error.status === 404) {
          this.errorMessage = 'Image not found'; // Set the specific error message for 404 status
        } else {
          this.errorMessage = 'Error fetching employee image'; // Set a generic error message for other errors
        }
        console.error('Error fetching employee image:', error);
      }
    );
  }
  
downloadFile(employeeId: number): void {
  this.employeeService.download(employeeId).subscribe(
    (response: Blob) => {
      const downloadLink = document.createElement('a');
      const url = window.URL.createObjectURL(response);
      downloadLink.href = url;
      downloadLink.download = `${this.employee.name}.pdf`; 
      downloadLink.click();
      window.URL.revokeObjectURL(url);
    },
    (error: HttpErrorResponse) => {
      if (error.status === 404) {
        this.errorMessage = 'File does not exist'; 
      } else {
        this.errorMessage = 'An error occurred during download';
        console.log('Error downloading the file:', error);
      }
    }
  );
} 
  getFilenameFromContentDisposition(contentDisposition: string | null): string {
    if (contentDisposition) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      if (matches && matches[1]) {
        return matches[1].replace(/['"]/g, '');
      }
    }
    return '';
  }
 
  
}
