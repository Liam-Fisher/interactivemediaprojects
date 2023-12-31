import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceFxComponent } from './voice-fx.component';

describe('VoiceFxComponent', () => {
  let component: VoiceFxComponent;
  let fixture: ComponentFixture<VoiceFxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoiceFxComponent]
    });
    fixture = TestBed.createComponent(VoiceFxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
