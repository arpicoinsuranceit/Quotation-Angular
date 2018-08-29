import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtaplBenefictInfoComponent } from './dtapl-benefict-info.component';

describe('DtaplBenefictInfoComponent', () => {
  let component: DtaplBenefictInfoComponent;
  let fixture: ComponentFixture<DtaplBenefictInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtaplBenefictInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtaplBenefictInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
