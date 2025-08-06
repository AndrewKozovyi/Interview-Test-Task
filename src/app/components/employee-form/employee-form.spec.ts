import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EmployeeForm} from './employee-form';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../services/employee';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const mockEmployeeService = {
  addEmployee: jasmine.createSpy('addEmployee'),
  updateEmployee: jasmine.createSpy('updateEmployee')
};

const mockMatDialogRef = {
  close: jasmine.createSpy('close')
};

describe('EmployeeForm', () => {
  let component: EmployeeForm;
  let fixture: ComponentFixture<EmployeeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmployeeForm,
        ReactiveFormsModule,
        CommonModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: null }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize an empty form with no data provided', () => {
      expect(component.employeeForm).toBeDefined();
      expect(component.employeeForm.get('id')?.value).toBeNull();
      expect(component.employeeForm.get('fullName')?.value).toBe('');
      expect(component.employeeForm.get('email')?.value).toBe('');
      expect(component.employeeForm.get('skills')?.value?.length).toBe(0);
    });

    it('should patch the form with existing employee data', () => {
      component['data'] = {
        id: 1,
        fullName: 'Test Employee',
        email: 'test@example.com',
        position: 'Developer',
        startDate: new Date('2023-01-01'),
        skills: [{skill: 'Angular', yearExperience: 2}]
      };
      component.ngOnInit();
      fixture.detectChanges();

      expect(component.employeeForm.valid).toBeTrue();
      expect(component.employeeForm.get('id')?.value).toBe(1);
      expect(component.employeeForm.get('fullName')?.value).toBe('Test Employee');
      expect(component.employeeForm.get('email')?.value).toBe('test@example.com');
      expect(component.employeeForm.get('position')?.value).toBe('Developer');
      expect(component.employeeForm.get('startDate')?.value).toEqual(new Date('2023-01-01'));
      expect(component.skills.length).toBe(1);
      expect(component.skills.at(0).get('skill')?.value).toBe('Angular');
    });
  });

  describe('Form Validation', () => {
    it('should validate fullName is required', () => {
      component.fullName.setValue('');
      expect(component.fullName.valid).toBeFalse();
      expect(component.fullName.hasError('required')).toBeTrue();
    });

    it('should validate fullName minLength is 3', () => {
      component.fullName.setValue('An');
      expect(component.fullName.valid).toBeFalse();
      expect(component.fullName.hasError('minlength')).toBeTrue();
    });

    it('should validate a valid fullName', () => {
      component.fullName.setValue('Andrew');
      expect(component.fullName.valid).toBeTrue();
    });

    it('should validate email is required', () => {
      component.email.setValue('');
      expect(component.email.valid).toBeFalse();
      expect(component.email.hasError('required')).toBeTrue();
    });

    it('should validate email format', () => {
      component.email.setValue('invalid-email');
      expect(component.email.valid).toBeFalse();
      expect(component.email.hasError('email')).toBeTrue();
    });

    it('should validate a valid email', () => {
      component.email.setValue('test@example.com');
      expect(component.email.valid).toBeTrue();
    });

    it('should validate position is required', () => {
      component.position.setValue(null);
      expect(component.position.valid).toBeFalse();
      expect(component.position.hasError('required')).toBeTrue();
    });

    it('should validate a valid position', () => {
      component.position.setValue('Developer');
      expect(component.position.valid).toBeTrue();
    });

    it('should validate startDate is required', () => {
      component.startDate.setValue(null);
      expect(component.startDate.valid).toBeFalse();
      expect(component.startDate.hasError('required')).toBeTrue();
    });

    it('should validate a valid startDate', () => {
      component.startDate.setValue(new Date());
      expect(component.startDate.valid).toBeTrue();
    });

    it('should add a new skill FormGroup to the FormArray', () => {
      component.addSkill();
      const skillGroup = component.skills.at(0);

      expect(component.skills.length).toBe(1);
      expect(skillGroup.get('skill')?.hasError('required')).toBeTrue();
      expect(skillGroup.get('yearExperience')?.value).toEqual(0);
    });

    it('should validate skill required and validate yearExperience min is 0', () => {
      component.addSkill();
      const skillGroup = component.skills.at(0);
      skillGroup.get('skill')?.setValue(null);
      skillGroup.get('yearExperience')?.setValue(-1);

      expect(skillGroup.get('skill')?.hasError('required')).toBeTrue();
      expect(skillGroup.get('yearExperience')?.hasError('min')).toBeTrue();
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      mockEmployeeService.addEmployee.calls.reset();
      mockEmployeeService.updateEmployee.calls.reset();
      mockMatDialogRef.close.calls.reset();

      component.employeeForm.setValue({
        id: null,
        fullName: 'New Employee',
        email: 'new@email.com',
        position: 'Designer',
        startDate: new Date(),
        skills: []
      });
    })

    it('should not submit an invalid form', () => {
      component.employeeForm.get('fullName')?.setValue(null);
      component.onSubmit();

      expect(mockEmployeeService.addEmployee).not.toHaveBeenCalled();
      expect(mockEmployeeService.updateEmployee).not.toHaveBeenCalled();
      expect(mockMatDialogRef.close).not.toHaveBeenCalled();
    });

    it('should add a new employee on valid form submission (no id)', () => {
      component.onSubmit();

      expect(mockEmployeeService.addEmployee).toHaveBeenCalled();
      expect(mockMatDialogRef.close).toHaveBeenCalled();
    });

    it('should update an existing employee on valid form submission (with id)', () => {
      component.employeeForm.patchValue({
        id: 5
      });
      component.onSubmit();

      expect(mockEmployeeService.updateEmployee).toHaveBeenCalled();
      expect(mockMatDialogRef.close).toHaveBeenCalled();
    });
  });
});
