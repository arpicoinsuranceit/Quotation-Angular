import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoAtpComponent } from './quo-atp.component';

describe('QuoAtpComponent', () => {
  let component: QuoAtpComponent;
  let fixture: ComponentFixture<QuoAtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoAtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoAtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
