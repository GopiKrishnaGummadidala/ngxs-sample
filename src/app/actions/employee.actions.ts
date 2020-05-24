import { EmployeeModel } from '../models/employee.model';

export class GetEmployees {
    static readonly type = '[Employees] Get';
}

export class AddEmployee {
    static readonly type = '[Employee] Add';
    constructor(public payload: EmployeeModel) { }
}

export class DeleteEmployee {
    static readonly type = '[Employee] Delete';
    constructor(public id: number) { }
}

export class UpdateEmployee {
    static readonly type = '[Employee] Edit';
    constructor(public payload: EmployeeModel, public id: number) { }
}