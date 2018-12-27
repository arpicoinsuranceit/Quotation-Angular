import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtpPersonalInfoComponent } from './atp-personal-info.component';

describe('AtpPersonalInfoComponent', () => {
  let component: AtpPersonalInfoComponent;
  let fixture: ComponentFixture<AtpPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtpPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtpPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
