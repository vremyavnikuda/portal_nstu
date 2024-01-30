import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfDeleteUserComponent } from './conf-delete-user.component';

describe('ConfDeleteUserComponent', () => {
  let component: ConfDeleteUserComponent;
  let fixture: ComponentFixture<ConfDeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfDeleteUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfDeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
