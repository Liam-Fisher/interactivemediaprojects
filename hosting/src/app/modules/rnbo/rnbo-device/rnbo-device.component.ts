import { Component, EventEmitter, Input, Output, WritableSignal } from '@angular/core';
import { RnboLoaderService } from 'src/app/services/rnbo/loader/rnbo-loader.service';
import * as RNBO from '@rnbo/js';
import { BehaviorSubject } from 'rxjs';
export interface IDeviceComponent {
  device_folder: string;
  device_id: string|null;
  device: RNBO.BaseDevice|null;
  
}
@Component({
  selector: 'app-rnbo-device',
  template: `
      <div class="rnbo-device__title">{{device_id()}}
        <span>{{(status|async)}}</span>
    </div>
      `,
  styleUrls: ['./rnbo-device.component.scss']
})
export class RnboDeviceComponent   {
  @Input() debug: boolean = true;
  @Input() device_folder: string = 'testing'; 
  // link this to the active route? 
  @Input() device_id!: WritableSignal<string>;
  device: RNBO.BaseDevice|null = null;
  // for informing
  status = new BehaviorSubject<string>('empty');
  // ouput the device_id when it's loaded
  @Output() loadedEvent = new EventEmitter<string>();
  constructor(public loader: RnboLoaderService) { }
  ngOnInit() { 
    console.log('device_id', this.device_id());
    this.loader.loadDevice(this.device_folder, this.device_id, true).then((device: RNBO.BaseDevice|null)=> {
      this.device = device;
      //this.loadedEvent.emit(device_id);
    },
    (error: any) => {
      console.log(error);
    });
  }
  ngAfterViewInit() {
  } 
}
