import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortTagSelectComponent } from './port-tag-select.component';

describe('PortTagSelectComponent', () => {
  let component: PortTagSelectComponent;
  let fixture: ComponentFixture<PortTagSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortTagSelectComponent]
    });
    fixture = TestBed.createComponent(PortTagSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
