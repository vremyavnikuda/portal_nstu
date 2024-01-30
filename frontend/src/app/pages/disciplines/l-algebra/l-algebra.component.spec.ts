import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LAlgebraComponent } from './l-algebra.component';

describe('LAlgebraComponent', () => {
  let component: LAlgebraComponent;
  let fixture: ComponentFixture<LAlgebraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LAlgebraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LAlgebraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
