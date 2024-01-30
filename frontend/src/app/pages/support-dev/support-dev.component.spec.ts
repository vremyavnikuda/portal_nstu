import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportDevComponent } from './support-dev.component';

describe('SupportDevComponent', () => {
  let component: SupportDevComponent;
  let fixture: ComponentFixture<SupportDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportDevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
