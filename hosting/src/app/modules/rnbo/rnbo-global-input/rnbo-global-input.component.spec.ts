import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboGlobalInputComponent } from './rnbo-global-input.component';

describe('RnboGlobalInputComponent', () => {
  let component: RnboGlobalInputComponent;
  let fixture: ComponentFixture<RnboGlobalInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RnboGlobalInputComponent]
    });
    fixture = TestBed.createComponent(RnboGlobalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
