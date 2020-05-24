import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddEmployee } from '../actions/employee.actions';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  public Id: number;
  public Name: string;
  public Email: string;
  public PhoneNum: string;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  addEmployee(): void{
    this.store.dispatch(new AddEmployee({ id: this.Id, name: this.Name, email: this.Email, phoneNum: this.PhoneNum }));
  }
}
