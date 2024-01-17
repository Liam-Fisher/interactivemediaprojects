import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboTransportStateComponent } from './rnbo-transport-state.component';

describe('RnboTransportStateComponent', () => {
  let component: RnboTransportStateComponent;
  let fixture: ComponentFixture<RnboTransportStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RnboTransportStateComponent]
    });
    fixture = TestBed.createComponent(RnboTransportStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
