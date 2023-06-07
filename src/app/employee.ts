import { SafeUrl } from "@angular/platform-browser";

export class Employee {
    id: number=0;
    name: string='';
    email: string='';
    number: string='';
    gender: string='';
    country: string='';
    interests:string[]=[];
    dob= new Date();
    isEdit:boolean=false;
    [key: string]: any; 
    image!:SafeUrl
    isCheckboxSelected!: boolean;
    hobbies:string[]=[];
}
