import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoAsfpComponent } from './quo-asfp.component';

describe('QuoAsfpComponent', () => {
  let component: QuoAsfpComponent;
  let fixture: ComponentFixture<QuoAsfpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoAsfpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoAsfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
