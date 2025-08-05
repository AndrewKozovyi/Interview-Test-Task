import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDefaultCard } from './employee-default-card';

describe('EmployeeDefaultCard', () => {
  let component: EmployeeDefaultCard;
  let fixture: ComponentFixture<EmployeeDefaultCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDefaultCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDefaultCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
