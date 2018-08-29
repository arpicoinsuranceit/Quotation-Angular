import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtrmPersonalInfoComponent } from './atrm-personal-info.component';

describe('AtrmPersonalInfoComponent', () => {
  let component: AtrmPersonalInfoComponent;
  let fixture: ComponentFixture<AtrmPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtrmPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtrmPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
