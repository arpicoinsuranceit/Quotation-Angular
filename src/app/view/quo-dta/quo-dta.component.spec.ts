import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoDtaComponent } from './quo-dta.component';

describe('QuoDtaComponent', () => {
  let component: QuoDtaComponent;
  let fixture: ComponentFixture<QuoDtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoDtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoDtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
