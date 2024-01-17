import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnboMaterialParameterComponent } from './rnbo-material-parameter.component';

describe('RnboMaterialParameterComponent', () => {
  let component: RnboMaterialParameterComponent;
  let fixture: ComponentFixture<RnboMaterialParameterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RnboMaterialParameterComponent]
    });
    fixture = TestBed.createComponent(RnboMaterialParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
