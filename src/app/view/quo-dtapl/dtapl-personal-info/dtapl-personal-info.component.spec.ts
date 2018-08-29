import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtaplPersonalInfoComponent } from './dtapl-personal-info.component';

describe('DtaplPersonalInfoComponent', () => {
  let component: DtaplPersonalInfoComponent;
  let fixture: ComponentFixture<DtaplPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtaplPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtaplPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
