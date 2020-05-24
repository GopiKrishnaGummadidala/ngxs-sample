import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';
import { Store, Select } from '@ngxs/store';
import { EmployeeState } from '../state/employee.state';
import { GetEmployees, DeleteEmployee } from '../actions/employee.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @Select(EmployeeState.getEmployees) employees$: Observable<EmployeeModel[]> ;
  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new GetEmployees());
  }

  editEmployee(employee: EmployeeModel): void {
    this.router.navigate(['/edit/' + employee.id]);
  }

  deleteEmployee(employee: EmployeeModel): void {
    this.store.dispatch(new DeleteEmployee(employee.id));
  }

}
