import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuoComponent } from './view-quo.component';

describe('ViewQuoComponent', () => {
  let component: ViewQuoComponent;
  let fixture: ComponentFixture<ViewQuoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQuoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
