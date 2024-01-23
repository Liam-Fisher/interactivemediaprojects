import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-rubix',
  template: `
    <!-- 
    <app-rubix-display></app-rubix-display>
    <app-rubix-rotation-input></app-rubix-rotation-input> -->
    <app-rubix-rnbo></app-rubix-rnbo>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `]
  /* styleUrls: ['./rubix.component.scss'] */
})
export class RubixComponent {
  device_id = signal('rubix_test');
  tag_id = signal('');

}
