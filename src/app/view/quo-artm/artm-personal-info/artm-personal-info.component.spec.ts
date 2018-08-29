import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtmPersonalInfoComponent } from './artm-personal-info.component';

describe('ArtmPersonalInfoComponent', () => {
  let component: ArtmPersonalInfoComponent;
  let fixture: ComponentFixture<ArtmPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtmPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtmPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
