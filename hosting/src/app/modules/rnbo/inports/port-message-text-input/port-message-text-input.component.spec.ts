import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortMessageTextInputComponent } from './port-message-text-input.component';

describe('PortMessageTextInputComponent', () => {
  let component: PortMessageTextInputComponent;
  let fixture: ComponentFixture<PortMessageTextInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortMessageTextInputComponent]
    });
    fixture = TestBed.createComponent(PortMessageTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
