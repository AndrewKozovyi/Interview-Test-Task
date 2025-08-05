import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { positions, skillsList } from '../../moks/form.mock';
import { EmployeeService } from '../../services/employee';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import { icons } from '../../moks/icons.mock'
// import trash from '../../../assets/trash.png'

@Component({
  selector: 'app-employee-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    ButtonModule,
    InputNumberModule,
    DialogModule,
    MatDialogActions,
    MatDialogContent,
    MatButton
  ],
  templateUrl: './employee-form.html',
  standalone: true,
  styleUrl: './employee-form.scss'
})
export class EmployeeForm {
  positionsList = positions;
  masterSkillsList = skillsList;
  trashIcon = icons.trash;

  employeeForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    position: new FormControl(null, [Validators.required]),
    startDate: new FormControl(null, [Validators.required]),
    skills: new FormArray([])
  });

  constructor(private employeeService: EmployeeService, public dialogRef: MatDialogRef<EmployeeForm>) {}

  get fullName() {
    return this.employeeForm.get('fullName') as FormControl;
  }

  get email() {
    return this.employeeForm.get('email') as FormControl;
  }

  get position() {
    return this.employeeForm.get('position') as FormControl;
  }

  get startDate() {
    return this.employeeForm.get('startDate') as FormControl;
  }

  get skills() {
    return this.employeeForm.get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return new FormGroup({
      skill: new FormControl(null, Validators.required),
      yearExperience: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }

  addSkill() {
    this.skills.push(this.newSkill());
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  getAvailableSkills(currentSkillControlValue: string | null): string[] {
    const selectedSkills = this.skills.controls
      .map(control => control.get('skill')?.value)
      .filter(skill => skill !== null);

    if (currentSkillControlValue) {
      selectedSkills.splice(selectedSkills.indexOf(currentSkillControlValue), 1);
    }
    return this.masterSkillsList.filter(skill => !selectedSkills.includes(skill));
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = this.employeeForm.value as unknown as Employee;
      this.employeeService.addEmployee(newEmployee);
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
