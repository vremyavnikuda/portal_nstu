import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InfoUserAdminPageComponent } from './info-user-admin-page.component'

describe('InfoUserAdminPageComponent', () => {
  let component: InfoUserAdminPageComponent
  let fixture: ComponentFixture<InfoUserAdminPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoUserAdminPageComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(InfoUserAdminPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
