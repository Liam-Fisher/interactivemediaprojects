import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicefxComponent } from './voicefx.component';

describe('VoicefxComponent', () => {
  let component: VoicefxComponent;
  let fixture: ComponentFixture<VoicefxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoicefxComponent]
    });
    fixture = TestBed.createComponent(VoicefxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
