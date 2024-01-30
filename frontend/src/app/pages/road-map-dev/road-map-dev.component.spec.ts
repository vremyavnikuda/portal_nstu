import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadMapDevComponent } from './road-map-dev.component';

describe('RoadMapDevComponent', () => {
  let component: RoadMapDevComponent;
  let fixture: ComponentFixture<RoadMapDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadMapDevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoadMapDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
