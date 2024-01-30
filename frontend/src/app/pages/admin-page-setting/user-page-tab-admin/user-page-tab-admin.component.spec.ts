import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageTabAdminComponent } from './user-page-tab-admin.component';

describe('UserPageTabAdminComponent', () => {
  let component: UserPageTabAdminComponent;
  let fixture: ComponentFixture<UserPageTabAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPageTabAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPageTabAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
