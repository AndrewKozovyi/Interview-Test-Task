import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {DatePipe} from '@angular/common';
import {Employee} from '../../models/employee';

@Component({
  selector: 'app-employee-default-card',
  imports: [
    ButtonDirective,
    Card,
    DatePipe
  ],
  templateUrl: './employee-default-card.html',
  standalone: true,
  styleUrl: './employee-default-card.scss'
})
export class EmployeeDefaultCard {
  @Input() employee!: Employee;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.employee.id);
  }

  onEdit() {
    this.edit.emit(this.employee.id);
  }}
