import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ImageComponent } from './image/image.component';
import { InlineEditingComponent } from './inline-editing/inline-editing.component';
import { ExcellComponent } from './excell/excell.component';


const routes: Routes = [
  {path:'employees', component: EmployeeListComponent},
  {path:'create-employee',component: CreateEmployeeComponent},
  {path:'update-employee/:id',component: UpdateEmployeeComponent},
  {path:'employee-details/:id',component:EmployeeDetailsComponent},
  {path:'inline-editing',component:InlineEditingComponent},
  {path:'excell',component:ExcellComponent},
  {path:'image',component:ImageComponent},
  {path:'', redirectTo:'employees', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
