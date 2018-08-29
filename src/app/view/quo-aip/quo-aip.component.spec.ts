import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoAipComponent } from './quo-aip.component';

describe('QuoAipComponent', () => {
  let component: QuoAipComponent;
  let fixture: ComponentFixture<QuoAipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoAipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoAipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
