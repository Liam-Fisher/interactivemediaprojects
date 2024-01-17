import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusTransportComponent } from './nexus-transport.component';

describe('NexusTransportComponent', () => {
  let component: NexusTransportComponent;
  let fixture: ComponentFixture<NexusTransportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NexusTransportComponent]
    });
    fixture = TestBed.createComponent(NexusTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
