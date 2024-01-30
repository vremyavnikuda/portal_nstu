import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalPagePortalComponent } from './user-personal-page-portal.component';

describe('UserPersonalPagePortalComponent', () => {
  let component: UserPersonalPagePortalComponent;
  let fixture: ComponentFixture<UserPersonalPagePortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPersonalPagePortalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPersonalPagePortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
