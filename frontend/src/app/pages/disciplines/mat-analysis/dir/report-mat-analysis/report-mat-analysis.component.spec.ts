import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMatAnalysisComponent } from './report-mat-analysis.component';

describe('ReportMatAnalysisComponent', () => {
  let component: ReportMatAnalysisComponent;
  let fixture: ComponentFixture<ReportMatAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportMatAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportMatAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
