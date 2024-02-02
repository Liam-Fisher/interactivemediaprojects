import { Component } from '@angular/core';
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
  constructor(public rnbo: RnboDeviceService) { }
  ngOnInit() { }
  doTest() {
    this.rnbo.inport.next(['on', [1]]);
    this.rnbo.inport.next(['on', [0]]);
  }
  logDevice() {
    console.log(this.rnbo.device());
  }

}
