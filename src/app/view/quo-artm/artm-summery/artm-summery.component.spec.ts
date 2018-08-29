import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtmSummeryComponent } from './artm-summery.component';

describe('ArtmSummeryComponent', () => {
  let component: ArtmSummeryComponent;
  let fixture: ComponentFixture<ArtmSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtmSummeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtmSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
