import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetSelectComponent } from './preset-select.component';

describe('PresetSelectComponent', () => {
  let component: PresetSelectComponent;
  let fixture: ComponentFixture<PresetSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresetSelectComponent]
    });
    fixture = TestBed.createComponent(PresetSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
