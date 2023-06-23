import { HttpClient, HttpErrorResponse,HttpEvent   } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError} from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL= "http://localhost:8080/api/employees";
  private baseImage="http://localhost:8080/api/employees/uploadImage";
  private apiUrl = 'http://localhost:8080/api/employees/uploadExcel';
  public employeeStatus: string='';
  selectedGender: string='';
  constructor(private httpClient: HttpClient ) { }

  getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`
    );
  }
  createEmployee(employee: Employee): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,employee);
  }
  getEmployeeById(id: number): Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }
  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,employee);
  }
  //delete Employee
  deleteEmployee(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  createImage(employee:Employee):Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.baseImage}`,employee);
  }
  getEmployeeImage(employeeId: number): Observable<Blob> {
    const url = `${this.baseURL}/${employeeId}/getImage`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }
  upload(employeeId: number, formData: FormData): Observable<HttpEvent<string[]>> {
    return this.httpClient.post<string[]>(`${this.baseURL}/fileupload/${employeeId}`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // define function to download files
  download(employeeId: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/download/${employeeId}`, {
      responseType: 'blob'
    });
  }
  uploadExcel(file: File): Observable<Employee[]> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<Employee[]>(this.apiUrl, formData);
  }
}
