import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexusDialMatrixComponent } from './nexus-dial-matrix.component';

describe('NexusDialMatrixComponent', () => {
  let component: NexusDialMatrixComponent;
  let fixture: ComponentFixture<NexusDialMatrixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NexusDialMatrixComponent]
    });
    fixture = TestBed.createComponent(NexusDialMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
