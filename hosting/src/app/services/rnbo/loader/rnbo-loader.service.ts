import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { WebAudioService } from '../../audio/web-audio.service';
import { FirebaseStorageService } from '../../firebase-storage/firebase-storage.service';


// all related services should be loaded from here
type WritableDevice = WritableSignal<RNBO.BaseDevice|null>;
type ReadablePatcher = Signal<RNBO.IPatcher['desc']|null>;
type ReadablePresets = Signal<RNBO.IPatcher['presets']|null>;
export type DeviceControl = { 
    device: WritableDevice;
    description: ReadablePatcher;
    presets: ReadablePresets;
};
@Injectable({
  providedIn: 'root',
})
export class RnboLoaderService {
  // device_id => device
  status = signal<'initialized'|'loading'|'failed'|'active'|'destroyed'>('initialized');
  debug = true;
  constructor(
    private storage: FirebaseStorageService,
    private audio: WebAudioService
  ) { }
  async loadPatcher(path: string|null, id: string|null): Promise<RNBO.IPatcher|null> {
    if (path && id) {
      const patcher = await this.storage.loadPatcher(path, id);
      return patcher;
    }
    return null;
  }
  async loadDevice(path: string|null, device_id: string|null): Promise<DeviceControl> {
    const device = signal<RNBO.BaseDevice|null>(null);
    const description = signal<RNBO.IPatcher['desc']|null>(null);
    const presets = signal<RNBO.IPatcher['presets']|null>(null);

  try {
    if (path && device_id) { 
      this.status.set('loading');
      if(this.debug) { console.log(`loading device at ${path}/${device_id}`); }
      const context = this.audio.ctx;
      const patcher = await this.storage.loadPatcher(path, device_id);
      const baseDevice = await RNBO.createDevice({ context, patcher });
      const {desc, presets} = patcher;
      if(this.debug) { 
        console.log('------------------patcher------------------', desc);
        console.log('~~~~~~~~~~~~~~~~~~presets~~~~~~~~~~~~~~~~~~', presets);
        console.log('===================device==================', baseDevice);
      }
      
      device.set(baseDevice);
      description.set(patcher.desc);
      presets.set(patcher.presets);
      
      this.status.set('active');  
      }
      else {
        this.status.set('failed');
        throw new Error('path or id is null');
      }
    }
  catch(error) {
    console.log(error);
    this.status.set('failed');
  }
  return { device, description, presets };
  }
}
/* 
getUniqueDeviceName(id: string): string {
  let device_name = id;
  let i = 0;
  while (this.devices.has(device_name)) {
    device_name = `${id}_${i++}`;
  }
  return device_name;
} */

/* import { Injectable, WritableSignal, signal } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { WebAudioService } from '../../audio/web-audio.service';
import { FirebaseStorageService } from '../../firebase-storage/firebase-storage.service';
import { BehaviorSubject } from 'rxjs';
import { IDeviceComponent } from '../../../modules/rnbo/rnbo-device/rnbo-device.component';
import { RnboMessagingService } from '../messages/rnbo-messaging.service';
import { RnboParametersService } from '../parameters/rnbo-parameters.service';
import { RnboBufferService } from '../buffers/rnbo-buffer.service';
import { RnboPresetService } from '../presets/rnbo-preset.service';
import { Target } from '../types/props';

// all related services should be loaded from here

  reset() {
    this.deviceIDMap.clear();
    this.devices.clear();
  }
  async loadFolderMap(): Promise<void> {
    this.loadingDevice.set(true);
    let device_folders = await this.storage.listStorageFolders('rnbo_patchers');
    console.log('device_folders', device_folders);
    for await (let folder of device_folders) {
      let device_ids = await this.storage.listStorageFiles(`rnbo_patchers/${folder}`);
      this.deviceIDMap.set(folder, device_ids);
    }
    this.loadingDevice.set(false);
  }
  getFolderNames(): string[] {
    return Array.from(this.deviceIDMap.keys());
  }
  getDeviceIDs(device_folder: string|null): string[] {
    return this.deviceIDMap.get(device_folder ?? '') ?? [];
  }
 */