import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();
  private nextId = 1;

  constructor() {
    this.loadFromLocalStorage();
  }

  getEmployees(): Employee[] {
    return this.employeesSubject.value;
  }

  addEmployee(employee: Employee) {
    const currentEmployees = this.getEmployees();
    employee.id = this.nextId++;
    const newEmployeeList = [...currentEmployees, employee];
    this.employeesSubject.next(newEmployeeList);
    this.saveToLocalStorage(newEmployeeList);
  }

  updateEmployee(updatedEmployee: Employee) {
    const currentEmployees = this.getEmployees();
    const index = currentEmployees.findIndex(e => e.id === updatedEmployee.id);
    if (index !== -1) {
      currentEmployees[index] = updatedEmployee;
      const updatedList = [...currentEmployees];
      this.employeesSubject.next(updatedList);
      this.saveToLocalStorage(updatedList);
    }
  }

  deleteEmployee(id: number) {
    const currentEmployees = this.getEmployees();
    const filteredEmployees = currentEmployees.filter(e => e.id !== id);
    this.employeesSubject.next(filteredEmployees);
    this.saveToLocalStorage(filteredEmployees);
  }

  private saveToLocalStorage(employees: Employee[]): void {
    localStorage.setItem('EmployeeList', JSON.stringify(employees));
  }

  private loadFromLocalStorage(): void {
    const storedEmployees = localStorage.getItem('EmployeeList');
    if (storedEmployees) {
      const employees = JSON.parse(storedEmployees);
      this.employeesSubject.next(employees);
      const maxId = employees.reduce((max: number, e: Employee) => (e.id > max ? e.id : max), 0);
      this.nextId = maxId + 1;
    }
  }
}
