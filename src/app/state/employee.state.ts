import { EmployeeModel } from '../models/employee.model';
import { State, Selector, Action, StateContext, createSelector } from '@ngxs/store';
import { AddEmployee, GetEmployees, DeleteEmployee, UpdateEmployee } from '../actions/employee.actions';
import { EmployeeService } from '../services/employee.service';
import { tap } from 'rxjs/operators';

export class EmployeeStateModel {
    employees: EmployeeModel[];
}

@State<EmployeeStateModel>({
    name: 'employees',
    defaults: {
        employees: []
    }
})

export class EmployeeState {
    constructor(private employeeService: EmployeeService) {
    }

    @Selector()
    static getEmployees(state: EmployeeStateModel) {
        return state.employees;
    }

    @Selector()
    static getSelectedEmployee(id: string) {
        return createSelector([EmployeeState], (state: any) => {
            return state.employees.employees.find(e => e.id === id);
        });
    }

    @Action(GetEmployees)
    Get({ getState, setState }: StateContext<EmployeeStateModel>) {
        return this.employeeService.getEmployees().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                employees: result,
            });
        }));
    }

    @Action(AddEmployee)
    Add({ getState, patchState }: StateContext<EmployeeStateModel>, { payload }: AddEmployee) {
        return this.employeeService.addEmployee(payload).pipe(tap((result) => {
            const state = getState();
            patchState({
                employees: [...state.employees, payload]
            });
        }));

    }

    @Action(UpdateEmployee)
    Update({ getState, setState }: StateContext<EmployeeStateModel>, { payload, id }: UpdateEmployee) {
        return this.employeeService.updateEmployee(payload, id).pipe(tap((result) => {
            const state = getState();
            const empList = [...state.employees];
            const empIndex = empList.findIndex(item => item.id === id);
            empList[empIndex] = payload;
            setState({
                ...state,
                employees: empList,
            });
        }));

    }

    @Action(DeleteEmployee)
    Remove({ getState, setState }: StateContext<EmployeeStateModel>, { id }: DeleteEmployee) {
        return this.employeeService.deleteEmployee(id).pipe(tap(() => {
            const state = getState();
            const filteredArray = state.employees.filter(item => item.id !== id);
            setState({
                ...state,
                employees: filteredArray,
            });
        }));
    }
}