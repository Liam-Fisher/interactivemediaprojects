import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordingModeSelectComponent } from './recording-mode-select.component';

describe('RecordingModeSelectComponent', () => {
  let component: RecordingModeSelectComponent;
  let fixture: ComponentFixture<RecordingModeSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordingModeSelectComponent]
    });
    fixture = TestBed.createComponent(RecordingModeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
