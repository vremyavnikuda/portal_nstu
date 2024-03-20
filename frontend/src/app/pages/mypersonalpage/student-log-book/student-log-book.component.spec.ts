import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLogBookComponent } from './student-log-book.component';

describe('StudentLogBookComponent', () => {
  let component: StudentLogBookComponent;
  let fixture: ComponentFixture<StudentLogBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentLogBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentLogBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
