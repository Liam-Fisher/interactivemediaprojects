import { Component, EventEmitter, Injector, Input, Output, WritableSignal, effect, signal } from '@angular/core';
import { DeviceControl, RnboLoaderService } from 'src/app/services/rnbo/loader/rnbo-loader.service';
import * as RNBO from '@rnbo/js';
export type IDSignal = WritableSignal<string|null>;
export type StatusSignal = WritableSignal<'initialized'|'loading'|'failed'|'active'|'destroyed'>;

@Component({
  selector: 'app-rnbo-device',
  template: `
      <div class="rnbo-device__title">{{device_id()}}
        <span>{{loader.status()}}</span>
    </div>
      `,
  styleUrls: ['./rnbo-device.component.scss']
})
export class RnboDeviceComponent   {
  @Input() path!: WritableSignal<string>; // could link this to the active route in the parent component
  @Input() device_id!: WritableSignal<string>;
  deviceControl!: DeviceControl // parent access to device
  // could probably use a function instead of a service
  constructor(public loader: RnboLoaderService) { }
  ngOnInit() { 
    effect(() => this.loadDevice(this.path(), this.device_id()));
  }
  async loadDevice(path: string|null, device_id: string|null) {
    this.deviceControl = await this.loader.loadDevice(path, device_id);
  }
}
