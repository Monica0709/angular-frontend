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
}
