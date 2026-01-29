import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllCbusers } from './get-all-cbusers';

describe('GetAllCbusers', () => {
  let component: GetAllCbusers;
  let fixture: ComponentFixture<GetAllCbusers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllCbusers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllCbusers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
