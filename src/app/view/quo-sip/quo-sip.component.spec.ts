import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoSipComponent } from './quo-sip.component';

describe('QuoSipComponent', () => {
  let component: QuoSipComponent;
  let fixture: ComponentFixture<QuoSipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoSipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoSipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
