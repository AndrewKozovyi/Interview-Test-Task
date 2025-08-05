import { Component, EventEmitter, Input, Output } from '@angular/core';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-employee-list-card',
  imports: [
    ButtonDirective
  ],
  templateUrl: './employee-list-card.html',
  standalone: true,
  styleUrl: './employee-list-card.scss'
})
export class EmployeeListCard {
  @Input() employee!: any;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.employee.id);
  }

  onEdit() {
    this.edit.emit(this.employee.id);
  }
}
