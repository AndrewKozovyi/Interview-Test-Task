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
  employees$!: Observable<any[]>;
  displayEmployees$!: Observable<any[]>;

  searchControl = new FormControl('');
  sortOrder = new BehaviorSubject<'name-asc' | 'name-desc' | 'startDate' | 'numSkills' | null>(null);

  viewMode: 'card' | 'list' = 'card'; // State variable for view mode

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.employees$ = this.employeeService.employees$;

    this.displayEmployees$ = combineLatest([
      this.employees$,
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.sortOrder.asObservable()
    ]).pipe(
      map(([employees, searchTerm, sortOrder]) => {
        const safeSearchTerm = searchTerm || '';
        let filteredEmployees = employees.filter(employee =>
          employee.fullName.toLowerCase().includes(safeSearchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(safeSearchTerm.toLowerCase())
        );
        if (sortOrder) {
          filteredEmployees.sort((a, b) => {
            if (sortOrder === 'name-asc') return a.fullName.localeCompare(b.fullName);
            if (sortOrder === 'name-desc') return b.fullName.localeCompare(a.fullName);
            if (sortOrder === 'startDate') return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
            if (sortOrder === 'numSkills') return a.skills.length - b.skills.length;
            return 0;
          });
        }
        return filteredEmployees;
      })
    );
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'card' ? 'list' : 'card';
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
  }

  setSortOrder(order: 'name-asc' | 'name-desc' | 'startDate' | 'numSkills') {
    this.sortOrder.next(order);
  }

  openEmployeeForm(employee?: Employee): void {
    this.dialog.open(EmployeeForm, {
      width: '500px',
      data: employee
    });
  }
}
