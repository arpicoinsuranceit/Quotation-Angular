import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoDtapComponent } from './quo-dtap.component';

describe('QuoDtapComponent', () => {
  let component: QuoDtapComponent;
  let fixture: ComponentFixture<QuoDtapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoDtapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoDtapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
