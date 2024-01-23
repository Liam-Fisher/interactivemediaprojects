import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamIdInputComponent } from './param-id-input.component';

describe('ParamIdInputComponent', () => {
  let component: ParamIdInputComponent;
  let fixture: ComponentFixture<ParamIdInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParamIdInputComponent]
    });
    fixture = TestBed.createComponent(ParamIdInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
