import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient,HttpEvent,HttpEventType,HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  id!: number;
  file:any;
  employee:Employee=new Employee();
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  constructor(private employeeService:EmployeeService,private toastr:ToastrService, 
    private route:ActivatedRoute, private router :Router,private http:HttpClient, private sanitizer: DomSanitizer){}
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
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;

  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }

  convertBase64ToImage(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  onUpload() {
    console.log(this.selectedFile);
    
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
    const employeeId = this.employee.id;
  
    this.http.post(`http://localhost:8080/api/employees/uploadImage?id=${employeeId}`, uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      });
      
    }
    onUploadFiles(event: any): void {
      const files: File[] = event.target.files;
      const formData = new FormData();
      for (const file of files) {
        formData.append('files', file, file.name);
      }
      this.employeeService.upload(formData).subscribe(
        (event: any) => {
          console.log(event);
          this.resportProgress(event);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
    

  // define a function to download files
  onDownloadFile(filename: string): void {
    this.employeeService.download(filename).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
        default:
          console.log(httpEvent);
          break;
      
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
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
