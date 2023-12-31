import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceUiComponent } from './device-ui.component';

describe('DeviceUiComponent', () => {
  let component: DeviceUiComponent;
  let fixture: ComponentFixture<DeviceUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceUiComponent]
    });
    fixture = TestBed.createComponent(DeviceUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
