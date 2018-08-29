import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArpSummeryComponent } from './arp-summery.component';

describe('ArpSummeryComponent', () => {
  let component: ArpSummeryComponent;
  let fixture: ComponentFixture<ArpSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArpSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArpSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
