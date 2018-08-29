import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoArpComponent } from './quo-arp.component';

describe('QuoArpComponent', () => {
  let component: QuoArpComponent;
  let fixture: ComponentFixture<QuoArpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoArpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoArpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
