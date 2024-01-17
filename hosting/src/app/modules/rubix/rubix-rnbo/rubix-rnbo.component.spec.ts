import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubixRnboComponent } from './rubix-rnbo.component';

describe('RubixRnboComponent', () => {
  let component: RubixRnboComponent;
  let fixture: ComponentFixture<RubixRnboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RubixRnboComponent]
    });
    fixture = TestBed.createComponent(RubixRnboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
