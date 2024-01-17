import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusKeyboardComponent } from './nexus-keyboard.component';

describe('NexusKeyboardComponent', () => {
  let component: NexusKeyboardComponent;
  let fixture: ComponentFixture<NexusKeyboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NexusKeyboardComponent]
    });
    fixture = TestBed.createComponent(NexusKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
