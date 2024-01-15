import { Component, Input } from '@angular/core';
import { RnboLoaderService } from 'src/app/services/rnbo/loader/rnbo-loader.service';
import * as RNBO from '@rnbo/js';
export interface IDeviceComponent {
  device_folder: string;
  device_id: string;
  device_name: string;
  device: RNBO.BaseDevice|null;

}
@Component({
  selector: 'app-rnbo-device',
  template: `
      <div class="rnbo-device__title">{{device_id}}
        <span>{{(loader.isLoaded|async) ? "loaded":"not loaded"}}</span>
    </div>
      `,
  styleUrls: ['./rnbo-device.component.scss']
})
export class RnboDeviceComponent implements IDeviceComponent {
  @Input() device_folder!: string;
  @Input() device_id!: string;
  @Input() device_name!: string;
  device: RNBO.BaseDevice|null = null;
  constructor(public loader: RnboLoaderService) { }
  ngAfterViewInit() {
    this.loader.loadIntoComponent(this);
  }
}
