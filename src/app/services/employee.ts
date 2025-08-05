import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();
  private nextId = 1;

  constructor() {
  }

  getEmployees(): Employee[] {
    return this.employeesSubject.value;
  }

  addEmployee(employee: Employee) {
    const currentEmployees = this.getEmployees();
    employee.id = this.nextId++;
    this.employeesSubject.next([...currentEmployees, employee]);
  }

  updateEmployee(updatedEmployee: Employee) {
    const currentEmployees = this.getEmployees();
    const index = currentEmployees.findIndex(e => e.id === updatedEmployee.id);
    if (index !== -1) {
      currentEmployees[index] = updatedEmployee;
      this.employeesSubject.next([...currentEmployees]);
    }
  }

  deleteEmployee(id: number) {
    const currentEmployees = this.getEmployees();
    const filteredEmployees = currentEmployees.filter(e => e.id !== id);
    this.employeesSubject.next(filteredEmployees);
  }
}
