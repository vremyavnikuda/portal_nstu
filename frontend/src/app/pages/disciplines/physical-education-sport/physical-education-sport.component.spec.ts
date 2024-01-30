import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalEducationSportComponent } from './physical-education-sport.component';

describe('PhysicalEducationSportComponent', () => {
  let component: PhysicalEducationSportComponent;
  let fixture: ComponentFixture<PhysicalEducationSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhysicalEducationSportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhysicalEducationSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
