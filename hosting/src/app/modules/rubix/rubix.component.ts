import { Component, Input } from '@angular/core';
import { BaseDevice } from '@rnbo/js';
import { RnboDeviceService } from 'src/app/services/rnbo/rnbo-device.service';

@Component({
  selector: 'app-rubix',
  template: `

    <app-rubix-display></app-rubix-display>
    <app-rubix-rotation-input></app-rubix-rotation-input> 

  <app-rubix-rnbo (loaded)="logDevice()"></app-rubix-rnbo>
  <button (click)="doTest()">Test</button>
    
    
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
  @Input() device!: BaseDevice;
  constructor(public rnbo: RnboDeviceService) { }
  ngOnInit() { }
  doTest() {
    console.log('testing rnbo');
    this.rnbo.device?.context.resume();
    this.rnbo.input.set(['tempo_in', [90]]);
    this.rnbo.input.set(['moveInput', [0, 0, 0]]);
  }
  logDevice() {
  }

}
