import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCalendarEventComponent } from './ViewCalendarEventComponent';

describe('ViewCalendarEventComponent', () => {
  let component: ViewCalendarEventComponent;
  let fixture: ComponentFixture<ViewCalendarEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCalendarEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCalendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
