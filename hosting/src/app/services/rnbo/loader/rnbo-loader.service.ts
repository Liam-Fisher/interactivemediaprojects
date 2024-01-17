import { Injectable } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { WebAudioService } from '../../audio/web-audio.service';
import { FirebaseStorageService } from '../../firebase-storage/firebase-storage.service';
import { BehaviorSubject } from 'rxjs';
import { IDeviceComponent } from '../../../modules/rnbo/rnbo-device/rnbo-device.component';
import { RnboMessagingService } from '../messages/rnbo-messaging.service';
import { RnboParametersService } from '../parameters/rnbo-parameters.service';
import { RnboBufferService } from '../buffers/rnbo-buffer.service';
import { RnboPresetService } from '../presets/rnbo-preset.service';

// all related services should be loaded from here

@Injectable({
  providedIn: 'root',
})
export class RnboLoaderService {
  // folder => device_id[]. basically an interface for firebase storage
  deviceIDMap = new Map<string, string[]>();
  selectedFolder = new BehaviorSubject<string|null>(null);
  // device_id => device
  devices = new Map<string, RNBO.BaseDevice>();
  isLoading = new BehaviorSubject<[string, string]|null>(null);
  constructor(
    private storage: FirebaseStorageService,
    private audio: WebAudioService,
    private bufferHub: RnboBufferService,
    private messagingHub: RnboMessagingService,
    private parameterHub: RnboParametersService,
    private presetHub: RnboPresetService,
    private timingHub: RnboMessagingService,
  ) {
    this.reset();
  }
  reset() {
    this.deviceIDMap.clear();
    this.devices.clear();
  }
  async loadFolderMap(): Promise<void> {
    this.isLoading.next(['folders', 'all']);
    let device_folders = await this.storage.listStorageFolders('rnbo_patchers');
    console.log('device_folders', device_folders);
    for await (let folder of device_folders) {
      let device_ids = await this.storage.listStorageFiles(`rnbo_patchers/${folder}`);
      this.deviceIDMap.set(folder, device_ids);
    }
    this.isLoading.next(null);
  }
  getFolderNames(): string[] {
    return Array.from(this.deviceIDMap.keys());
  }
  getDeviceIDs(device_folder: string|null): string[] {
    return this.deviceIDMap.get(device_folder ?? '') ?? [];
  }
  async loadDevice(component: IDeviceComponent): Promise<string> {
    
    let { device_folder, device_id, device } = component;
    console.log(`loading device at ${device_folder}/${device_id}`);

    if (device_folder && device_id) { 
      device_id = this.getUniqueDeviceName(device_id);
      this.isLoading.next([device_folder, device_id]);
      let context = this.audio.ctx;
      let patcher = await this.storage.loadPatcher(device_folder, device_id);

      device = await RNBO.createDevice({ context, patcher });
      this.devices.set(device_id, device);
      this.audio.addNode(device_id, device.node);

      await this.bufferHub.addDevice(device_id, device, patcher); 
      this.messagingHub.addDevice(device_id, device, patcher);
      this.parameterHub.addDevice(device_id, device, patcher);
      this.presetHub.addDevice(device_id, device, patcher);
      this.timingHub.addDevice(device_id, device, patcher);
      console.log('device', device);
      console.log('messaging', this.messagingHub.map);
      console.log('parameters', this.parameterHub.map);
      console.log('buffers', this.bufferHub.map);
      console.log('presets', this.presetHub.map);
      console.log('timing', this.timingHub.map);

    }
      else {
        device_id = '';
      }  

      component.device_id = device_id;
      component.device = device;
      this.isLoading.next(null);
      return device_id;
}
  getUniqueDeviceName(id: string): string {
    let device_name = id;
    let i = 0;
    while (this.devices.has(device_name)) {
      device_name = `${id}_${i++}`;
    }
    return device_name;
  }
}
