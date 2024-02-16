import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BaseDevice } from '@rnbo/js';
import { RnboDeviceService } from 'src/app/services/rnbo/rnbo-device.service';
import { RubixDisplayComponent } from './rubix-display/rubix-display.component';

@Component({
  selector: 'app-rubix',
  template: `

  <app-rubix-display #display></app-rubix-display>
  <app-rubix-rotation-input (reset)="display.reset()"></app-rubix-rotation-input> 

  <app-rubix-rnbo (loaded)="logDevice()"></app-rubix-rnbo>
  
    
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
    app-rubix-display {
      width: min(100%, 1000px);
      aspect-ratio: 1/1;
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
