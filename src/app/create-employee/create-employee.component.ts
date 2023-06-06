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
   selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;

  //Gets called when the user selects an image
  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }


  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
  
    // Assuming you have the employee ID stored in a variable called `employeeId`
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
  file:any;
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
