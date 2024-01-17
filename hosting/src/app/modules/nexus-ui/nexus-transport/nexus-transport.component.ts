import { Component, Input } from '@angular/core';
import * as Nexus from 'nexusui';
@Component({
  selector: 'app-nexus-transport',
  template: `
<div class="nexus-transport">
  <div class="nexus-transport__title">Transport</div>
  <div class="nexus-transport__body"></div></div>
  `,
  styleUrls: ['./nexus-transport.component.scss']
})
export class NexusTransportComponent {
  @Input() device_id!: string|null;
  constructor() { 
    let dial = new Nexus.Sequencer('#dial', {});

  }

}
