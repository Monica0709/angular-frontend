import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  apiUrl = 'http://localhost:8080/api/employees/upload-image';
  selectedFile: File | null = null;
  constructor(private router:Router, private http:HttpClient){}
  onFileSelected(event:any) {
      this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      this.http.post(this.apiUrl, formData).subscribe((response) => {
        console.log(response);
      });
  }
}
}
