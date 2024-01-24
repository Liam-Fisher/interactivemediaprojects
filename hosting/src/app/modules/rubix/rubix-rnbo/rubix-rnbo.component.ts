import { Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RubixService } from 'src/app/services/rubix/rubix.service';
import { RnboDeviceComponent } from '../../rnbo/rnbo-device/rnbo-device.component';

@Component({
  selector: 'app-rubix-rnbo',
  template:`
  <app-rnbo-device device_folder="rubix" (loadedEvent)="deviceLoaded($event)"></app-rnbo-device>
  `,
  styleUrls: ['./rubix-rnbo.component.scss']
})
export class RubixRnboComponent {
    active_device_id = new BehaviorSubject<string|null>(null);
    @ViewChild(RnboDeviceComponent) device!: RnboDeviceComponent;
    constructor(public rubix: RubixService) { }
    ngOnInit() {  }
    ngAfterViewInit() { }
    deviceLoaded(device_id: string) { 
      this.active_device_id.next(device_id);
      this.rubix.connectDevice(device_id);
    }
}
