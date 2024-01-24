import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboKeyboardComponent } from './rnbo-keyboard.component';

describe('RnboKeyboardComponent', () => {
  let component: RnboKeyboardComponent;
  let fixture: ComponentFixture<RnboKeyboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RnboKeyboardComponent]
    });
    fixture = TestBed.createComponent(RnboKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
