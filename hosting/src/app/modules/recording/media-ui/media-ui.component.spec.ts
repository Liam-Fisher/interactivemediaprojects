import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaUiComponent } from './media-ui.component';

describe('MediaUiComponent', () => {
  let component: MediaUiComponent;
  let fixture: ComponentFixture<MediaUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaUiComponent]
    });
    fixture = TestBed.createComponent(MediaUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
