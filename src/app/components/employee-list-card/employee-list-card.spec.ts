import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListCard } from './employee-list-card';

describe('EmployeeListCard', () => {
  let component: EmployeeListCard;
  let fixture: ComponentFixture<EmployeeListCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeListCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
