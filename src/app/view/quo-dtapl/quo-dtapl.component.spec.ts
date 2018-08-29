import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoDtaplComponent } from './quo-dtapl.component';

describe('QuoDtaplComponent', () => {
  let component: QuoDtaplComponent;
  let fixture: ComponentFixture<QuoDtaplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoDtaplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoDtaplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
