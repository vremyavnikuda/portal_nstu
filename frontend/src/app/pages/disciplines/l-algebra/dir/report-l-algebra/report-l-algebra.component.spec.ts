import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLAlgebraComponent } from './report-l-algebra.component';

describe('ReportLAlgebraComponent', () => {
  let component: ReportLAlgebraComponent;
  let fixture: ComponentFixture<ReportLAlgebraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportLAlgebraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportLAlgebraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
