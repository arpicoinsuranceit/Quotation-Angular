import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { End1PersonalInfoComponent } from './end1-personal-info.component';

describe('End1PersonalInfoComponent', () => {
  let component: End1PersonalInfoComponent;
  let fixture: ComponentFixture<End1PersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ End1PersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(End1PersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
