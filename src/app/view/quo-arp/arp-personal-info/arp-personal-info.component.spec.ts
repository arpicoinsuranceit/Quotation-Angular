import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArpPersonalInfoComponent } from './arp-personal-info.component';

describe('ArpPersonalInfoComponent', () => {
  let component: ArpPersonalInfoComponent;
  let fixture: ComponentFixture<ArpPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArpPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArpPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
