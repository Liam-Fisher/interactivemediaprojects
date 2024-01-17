import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubixDisplayComponent } from './rubix-display.component';

describe('RubixDisplayComponent', () => {
  let component: RubixDisplayComponent;
  let fixture: ComponentFixture<RubixDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RubixDisplayComponent]
    });
    fixture = TestBed.createComponent(RubixDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
