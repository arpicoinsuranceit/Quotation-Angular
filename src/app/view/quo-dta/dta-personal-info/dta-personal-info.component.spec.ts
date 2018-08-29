import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtaPersonalInfoComponent } from './dta-personal-info.component';

describe('DtaPersonalInfoComponent', () => {
  let component: DtaPersonalInfoComponent;
  let fixture: ComponentFixture<DtaPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtaPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtaPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
