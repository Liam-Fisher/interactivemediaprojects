import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectSelectUiComponent } from './effect-select-ui.component';

describe('EffectSelectUiComponent', () => {
  let component: EffectSelectUiComponent;
  let fixture: ComponentFixture<EffectSelectUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EffectSelectUiComponent]
    });
    fixture = TestBed.createComponent(EffectSelectUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
