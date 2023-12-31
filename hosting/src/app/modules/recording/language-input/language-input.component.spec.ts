import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageInputComponent } from './language-input.component';

describe('LanguageInputComponent', () => {
  let component: LanguageInputComponent;
  let fixture: ComponentFixture<LanguageInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageInputComponent]
    });
    fixture = TestBed.createComponent(LanguageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
