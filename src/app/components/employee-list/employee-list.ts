import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, startWith, map } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {AsyncPipe, NgClass} from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EmployeeForm } from '../employee-form/employee-form';
import {EmployeeDefaultCard} from '../employee-default-card/employee-default-card';
import {EmployeeListCard} from '../employee-list-card/employee-list-card';
import { Employee } from '../../models/employee';
import { EmployeeSortOrder } from '../../moks/form.mock'

@Component({
  selector: 'app-employee-list',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    AsyncPipe,
    MatDialogModule,
    EmployeeDefaultCard,
    NgClass,
    EmployeeListCard
  ],
  templateUrl: './employee-list.html',
  standalone: true,
  styleUrl: './employee-list.scss'
})
export class EmployeeList implements OnInit {
  displayEmployees$!: Observable<Employee[]>;
  sortTypes = EmployeeSortOrder;

  searchControl = new FormControl('');
  sortOrder = new BehaviorSubject<EmployeeSortOrder | null>(null);

  viewMode: 'card' | 'list' = 'card';

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.displayEmployees$ = combineLatest([
      this.employeeService.employees$,
      this.searchControl.valueChanges.pipe(
        startWith(this.searchControl.value),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.sortOrder.asObservable()
    ]).pipe(
      map(([employees, searchTerm, sortOrder]) => {
        const term = searchTerm || '';
        let filteredEmployees = employees.filter(employee =>
          (employee.fullName?.toLowerCase() || '').includes(term.toLowerCase()) ||
          (employee.email?.toLowerCase() || '').includes(term.toLowerCase())
        );
        return this.sortEmployees(filteredEmployees, sortOrder);
      })
    );
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'card' ? 'list' : 'card';
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
  }

  setSortOrder(order: EmployeeSortOrder) {
    this.sortOrder.next(order);
  }

  openEmployeeForm(employee?: Employee): void {
    this.dialog.open(EmployeeForm, {
      width: '500px',
      data: employee
    });
  }

  private sortEmployees(employees: Employee[], order: EmployeeSortOrder | null): Employee[] {
    if (!order) return employees;

    return employees.sort((a, b) => {
      switch (order) {
        case EmployeeSortOrder.NameAsc:
          return (a.fullName || '').localeCompare(b.fullName || '');
        case EmployeeSortOrder.NameDesc:
          return (b.fullName || '').localeCompare(a.fullName || '');
        case EmployeeSortOrder.StartDate:
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case EmployeeSortOrder.NumSkills:
          return (a.skills?.length || 0) - (b.skills?.length || 0);
        default:
          return 0;
      }
    });
  }
}
