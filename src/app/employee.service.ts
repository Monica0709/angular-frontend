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
  getImage(employeeId: number): Observable<any> {
    const url = `${this.baseURL}/${employeeId}/getImage`;

    return this.httpClient.get(url, { responseType: 'blob' });
  }
  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.httpClient.post<string[]>(`${this.baseURL}/fileupload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // define function to download files
  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.httpClient.get(`${this.baseURL}/download/${filename}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
}
