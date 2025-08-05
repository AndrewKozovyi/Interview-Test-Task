import { Component, signal } from '@angular/core';
import {EmployeeFormComponent} from './components/employee-form/employee-form.component';

@Component({
  selector: 'app-root',
  imports: [EmployeeFormComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
}
