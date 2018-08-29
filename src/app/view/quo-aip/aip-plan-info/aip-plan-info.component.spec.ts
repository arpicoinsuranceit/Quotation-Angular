import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AipPlanInfoComponent } from './aip-plan-info.component';

describe('AipPlanInfoComponent', () => {
  let component: AipPlanInfoComponent;
  let fixture: ComponentFixture<AipPlanInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AipPlanInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AipPlanInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
