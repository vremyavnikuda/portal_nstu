import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPageDevComponent } from './contact-page-dev.component';

describe('ContactPageDevComponent', () => {
  let component: ContactPageDevComponent;
  let fixture: ComponentFixture<ContactPageDevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPageDevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactPageDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
