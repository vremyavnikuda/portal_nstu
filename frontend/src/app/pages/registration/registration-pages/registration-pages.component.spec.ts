import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPagesComponent } from './registration-pages.component';

describe('RegistrationPagesComponent', () => {
  let component: RegistrationPagesComponent;
  let fixture: ComponentFixture<RegistrationPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
