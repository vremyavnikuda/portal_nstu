import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicRussiaFoundationsComponent } from './basic-russia-foundations.component';

describe('BasicRussiaFoundationsComponent', () => {
  let component: BasicRussiaFoundationsComponent;
  let fixture: ComponentFixture<BasicRussiaFoundationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicRussiaFoundationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasicRussiaFoundationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
