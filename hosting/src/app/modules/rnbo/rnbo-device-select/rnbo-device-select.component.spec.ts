import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboDeviceSelectComponent } from './rnbo-device-select.component';

describe('RnboDeviceSelectComponent', () => {
  let component: RnboDeviceSelectComponent;
  let fixture: ComponentFixture<RnboDeviceSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RnboDeviceSelectComponent]
    });
    fixture = TestBed.createComponent(RnboDeviceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
