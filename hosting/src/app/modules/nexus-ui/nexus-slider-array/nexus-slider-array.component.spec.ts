import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusSliderArrayComponent } from './nexus-slider-array.component';

describe('NexusSliderArrayComponent', () => {
  let component: NexusSliderArrayComponent;
  let fixture: ComponentFixture<NexusSliderArrayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NexusSliderArrayComponent]
    });
    fixture = TestBed.createComponent(NexusSliderArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
