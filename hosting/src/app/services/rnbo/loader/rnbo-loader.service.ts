import { Injectable } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { WebAudioService } from '../../audio/web-audio.service';
import { FirebaseStorageService } from '../../firebase-storage/firebase-storage.service';
import { BehaviorSubject } from 'rxjs';
import { IDeviceComponent } from '../../../modules/rnbo/rnbo-device/rnbo-device.component';
@Injectable({
  providedIn: 'root',
})
export class RnboLoaderService {
  isLoaded = new BehaviorSubject(false);
  deviceMap = new Map<string, RNBO.BaseDevice>();
  deviceIDs = new BehaviorSubject<string[]>([]);
  constructor(
    private storage: FirebaseStorageService,
    private audio: WebAudioService
  ) {}
  async loadIntoComponent(component: IDeviceComponent) {
    this.isLoaded.next(false);
    let { device_folder, device_id, device_name } = component;

    if (device_folder && device_id) {
      let context = this.audio.ctx;
      let patcher = await this.storage.loadPatcher(device_folder, device_id);
      
      let device = await RNBO.createDevice({ context, patcher });
      this.deviceMap.set(device_name, device);
      this.deviceIDs.next([...this.deviceMap.keys()]);
      this.audio.addNode(device_id, device.node);
      component.device = device;
      
      this.isLoaded.next(true);
    } else {
      component.device = null;
    }
  }
}
