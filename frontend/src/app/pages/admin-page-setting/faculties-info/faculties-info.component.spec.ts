import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FacultiesInfoComponent } from './faculties-info.component'

describe('FacultiesInfoComponent', () => {
  let component: FacultiesInfoComponent
  let fixture: ComponentFixture<FacultiesInfoComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultiesInfoComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(FacultiesInfoComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
