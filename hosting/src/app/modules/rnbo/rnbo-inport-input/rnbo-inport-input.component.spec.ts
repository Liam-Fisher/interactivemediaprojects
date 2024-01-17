import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboInportInputComponent } from './rnbo-inport-input.component';

describe('RnboInportInputComponent', () => {
  let component: RnboInportInputComponent;
  let fixture: ComponentFixture<RnboInportInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RnboInportInputComponent]
    });
    fixture = TestBed.createComponent(RnboInportInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
