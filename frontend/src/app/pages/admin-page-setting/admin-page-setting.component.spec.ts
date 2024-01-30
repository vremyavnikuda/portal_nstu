import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageSettingComponent } from './admin-page-setting.component';

describe('AdminPageSettingComponent', () => {
  let component: AdminPageSettingComponent;
  let fixture: ComponentFixture<AdminPageSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPageSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPageSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
