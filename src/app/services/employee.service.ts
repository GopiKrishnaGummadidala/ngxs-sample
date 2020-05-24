import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url: string;
  constructor(private http: HttpClient) {
  }

  getEmployees() {
      return this.http.get<EmployeeModel[]>(this.url);
  }

  deleteEmployee(id: number) {
      return this.http.delete(this.url +`/${id}`);
  }

  addEmployee(payload: EmployeeModel) {
      return this.http.post<EmployeeModel>(this.url , payload);
  }

  updateEmployee(payload: EmployeeModel, id: number) {
      return this.http.put<EmployeeModel>(this.url +`/${id}`, payload);
  }
}
