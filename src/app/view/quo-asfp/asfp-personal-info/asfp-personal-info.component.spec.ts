import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsfpPersonalInfoComponent } from './asfp-personal-info.component';

describe('AsfpPersonalInfoComponent', () => {
  let component: AsfpPersonalInfoComponent;
  let fixture: ComponentFixture<AsfpPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsfpPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsfpPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
