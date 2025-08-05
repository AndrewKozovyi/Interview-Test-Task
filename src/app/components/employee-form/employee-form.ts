import {Component, Inject, OnInit} from '@angular/core';
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
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {Skill, SkillFormGroup} from '../../models/skill';
import { Employee } from '../../models/employee';

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
export class EmployeeForm implements OnInit {
  positionsList = positions;
  masterSkillsList = skillsList;

  employeeForm = new FormGroup({
    id: new FormControl<number | null>(null),
    fullName: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    position: new FormControl<string | null>(null, [Validators.required]),
    startDate: new FormControl<Date | null>(null, [Validators.required]),
    skills: new FormArray<FormGroup<SkillFormGroup>>([])
  });

  constructor(
    private employeeService: EmployeeService,
    public dialogRef: MatDialogRef<EmployeeForm>,
    @Inject(MAT_DIALOG_DATA) private data: Employee
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.initializeForm(this.data);
    }
  }

  private initializeForm(employee: Employee): void {
    this.employeeForm.patchValue({
      id: employee.id,
      fullName: employee.fullName,
      email: employee.email,
      position: employee.position,
      startDate: new Date(employee.startDate)
    });

    this.skills.clear();
    employee.skills.forEach((skill: Skill) => {
      const skillGroup = this.newSkill();
      skillGroup.patchValue(skill);
      this.skills.push(skillGroup);
    });
  }

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
      const formValue = this.employeeForm.getRawValue();

      const employeeData: Employee = {
        id: formValue.id as number,
        fullName: formValue.fullName as string,
        email: formValue.email as string,
        position: formValue.position as string,
        startDate: formValue.startDate as Date,
        skills: formValue.skills as Skill[]
      };

      if (employeeData.id) {
        this.employeeService.updateEmployee(employeeData);
      } else {
        this.employeeService.addEmployee(employeeData);
      }

      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
