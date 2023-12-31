import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordButtonComponent } from './record-button.component';

describe('RecordButtonComponent', () => {
  let component: RecordButtonComponent;
  let fixture: ComponentFixture<RecordButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordButtonComponent]
    });
    fixture = TestBed.createComponent(RecordButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
