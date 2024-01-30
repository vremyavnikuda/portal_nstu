import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPageAdminComponent } from './setting-page-admin.component';

describe('SettingPageAdminComponent', () => {
  let component: SettingPageAdminComponent;
  let fixture: ComponentFixture<SettingPageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingPageAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
