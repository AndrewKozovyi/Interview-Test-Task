import { Component } from '@angular/core';
import {EmployeeList} from './components/employee-list/employee-list';

@Component({
  selector: 'app-root',
  imports: [EmployeeList],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
}
