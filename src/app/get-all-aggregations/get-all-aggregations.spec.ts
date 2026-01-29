import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllAggregations } from './get-all-aggregations';

describe('GetAllAggregations', () => {
  let component: GetAllAggregations;
  let fixture: ComponentFixture<GetAllAggregations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllAggregations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllAggregations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
