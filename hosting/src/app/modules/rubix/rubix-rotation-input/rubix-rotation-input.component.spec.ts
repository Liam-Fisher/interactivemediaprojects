import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubixRotationInputComponent } from './rubix-rotation-input.component';

describe('RubixRotationInputComponent', () => {
  let component: RubixRotationInputComponent;
  let fixture: ComponentFixture<RubixRotationInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RubixRotationInputComponent]
    });
    fixture = TestBed.createComponent(RubixRotationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
