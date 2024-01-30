import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypersonalpageComponent } from './mypersonalpage.component';

describe('MypersonalpageComponent', () => {
  let component: MypersonalpageComponent;
  let fixture: ComponentFixture<MypersonalpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MypersonalpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MypersonalpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
