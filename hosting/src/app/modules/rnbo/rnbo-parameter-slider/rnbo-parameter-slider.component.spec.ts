import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboParameterSliderComponent } from './rnbo-parameter-slider.component';

describe('RnboParameterSliderComponent', () => {
  let component: RnboParameterSliderComponent;
  let fixture: ComponentFixture<RnboParameterSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RnboParameterSliderComponent]
    });
    fixture = TestBed.createComponent(RnboParameterSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
