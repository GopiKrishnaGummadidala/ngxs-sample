import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { EmployeeState } from '../state/employee.state';
import { EmployeeModel } from '../models/employee.model';
import { UpdateEmployee } from '../actions/employee.actions';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  employee: EmployeeModel;

  constructor(private store: Store, private activeRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit() {
    this.store.select(EmployeeState.getSelectedEmployee(this.activeRoute.snapshot.paramMap.get('empId'))).subscribe((res: EmployeeModel) => {
      this.employee = res;
    });
  }

  updateEmployee(): void {
    this.store.dispatch(new UpdateEmployee(this.employee, this.employee.id));
    this.router.navigate(['/']);
  }

}
