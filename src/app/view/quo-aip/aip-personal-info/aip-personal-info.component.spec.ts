import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AipPersonalInfoComponent } from './aip-personal-info.component';

describe('AipPersonalInfoComponent', () => {
  let component: AipPersonalInfoComponent;
  let fixture: ComponentFixture<AipPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AipPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AipPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
