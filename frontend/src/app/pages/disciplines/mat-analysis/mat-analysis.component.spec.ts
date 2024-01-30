import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatAnalysisComponent } from './mat-analysis.component';

describe('MatAnalysisComponent', () => {
  let component: MatAnalysisComponent;
  let fixture: ComponentFixture<MatAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
