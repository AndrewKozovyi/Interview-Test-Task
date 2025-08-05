import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';
import {DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-employee-default-card',
  imports: [
    ButtonDirective,
    Card,
    NgForOf,
    DatePipe
  ],
  templateUrl: './employee-default-card.html',
  standalone: true,
  styleUrl: './employee-default-card.scss'
})
export class EmployeeDefaultCard {
  @Input() employee!: any;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.employee.id);
  }

  onEdit() {
    this.edit.emit(this.employee.id);
  }}
