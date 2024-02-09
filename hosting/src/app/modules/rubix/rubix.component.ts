import { Component, Input } from '@angular/core';
import { BaseDevice } from '@rnbo/js';
import { RnboDeviceService } from 'src/app/services/rnbo/rnbo-device.service';

@Component({
  selector: 'app-rubix',
  template: `

  <app-rubix-display></app-rubix-display>
  <app-rubix-rotation-input></app-rubix-rotation-input> 

  <app-rubix-rnbo (loaded)="logDevice()"></app-rubix-rnbo>
  
    
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    p {
      
    }
  `]
})
export class RubixComponent {
  constructor(public rnbo: RnboDeviceService) { }
  ngOnInit() { }
  logDevice() {
  }

}
