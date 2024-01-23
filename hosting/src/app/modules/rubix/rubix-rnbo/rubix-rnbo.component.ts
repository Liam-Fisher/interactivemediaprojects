import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RubixService } from 'src/app/services/rubix/rubix.service';

@Component({
  selector: 'app-rubix-rnbo',
  template:`
  <app-rnbo-device device_folder="rubix" (loadedEvent)="deviceLoaded($event)"></app-rnbo-device>
  <app-rnbo-inport-input [device_id]="active_device_id|async" tag_id="on"></app-rnbo-inport-input>
  `,
  styleUrls: ['./rubix-rnbo.component.scss']
})
export class RubixRnboComponent {
    active_device_id = new BehaviorSubject<string|null>(null);
    constructor(public rubix: RubixService) { }
    ngOnInit() {  }
    ngAfterViewInit() { }
    deviceLoaded(device_id: string) { 
      this.active_device_id.next(device_id);
      this.rubix.connectDevice(device_id);
    }
}
