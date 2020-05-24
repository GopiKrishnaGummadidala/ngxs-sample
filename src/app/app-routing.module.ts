import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'edit/:empId', component: EmployeeEditComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
