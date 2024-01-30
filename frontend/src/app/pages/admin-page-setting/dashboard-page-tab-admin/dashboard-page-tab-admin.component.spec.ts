import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPageTabAdminComponent } from './dashboard-page-tab-admin.component';

describe('DashboardPageTabAdminComponent', () => {
  let component: DashboardPageTabAdminComponent;
  let fixture: ComponentFixture<DashboardPageTabAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageTabAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardPageTabAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
