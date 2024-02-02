import { EffectRef, Injectable, Injector, NgZone, Signal, WritableSignal, computed, effect, signal, untracked } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { WebAudioService } from '../audio/web-audio.service';
import { FirebaseStorageService } from '../firebase-storage/firebase-storage.service';
import { IDSignal, Msg,PortType,StatusSignal, Subscribable, WritableDevice, WritablePatcher } from 'src/app/types/services/rnbo/signals';
import { BehaviorSubject } from 'rxjs';


// this is a 
@Injectable({
  providedIn: 'root'

})
export class RnboDeviceService {
  device_id: IDSignal = signal('');

  device: WritableDevice = signal(null);
  patcher: WritablePatcher = signal(null);
  
  input: WritableSignal<[string, number[]]> = signal(['', []]); 
  output: WritableSignal<[string, number[]]> = signal(['', []]);

  inport = new BehaviorSubject<[string, number[]]> (['', []]);
  outport= new BehaviorSubject<[string, number[]]> (['', []]);


  effects= new Map<string, EffectRef>();
  subscriptions = new Map<string, RNBO.IEventSubscription>();
  injector: Injector|null = null;
  status: StatusSignal = signal('idle');
  debug = true; // we can set this to false in production, any maybe turn this into a function
  constructor(
    private storage: FirebaseStorageService,
    private audio: WebAudioService,
    private ngZone: NgZone

  ) { }
async load(path: string|null, device_id: string|null, injector: Injector): Promise<void> {
  try {
    if (path && device_id) { 
      this.status.set('loading');
      this.injector = injector;
      if(this.debug) { 
        console.log(`loading device at ${path}/${device_id}`); 
      }

      let context = this.audio.ctx;
      let patcher = (await this.storage.loadPatcher(path, device_id));
      let device = await RNBO.createDevice({ context, patcher });

      if(this.debug) { 
        console.log('------------------patcher------------------', patcher.desc);
        console.log('~~~~~~~~~~~~~~~~~~presets~~~~~~~~~~~~~~~~~~', patcher.presets);
        console.log('===================device==================', device);
      }

    //  this.link(device_id, device, injector);

      this.device.set(device);

      this.inport.subscribe((msg: [string, number[]]) => this.device()?.scheduleEvent(this.createMessage(msg)));
      this.device()?.messageEvent.subscribe((e: RNBO.MessageEvent) => this.setData(e));
      
    }
      else {
        throw new Error('path or id is null');
      }
    }
  catch(error) {
    throw error;
  }
  
  }
  createMessage(msg: Msg) {
    return (new RNBO.MessageEvent(0, ...msg));
}
parse(data?: number|number[]): number[] {
  return data===undefined?[]:[data].flat();
}
setData({tag, payload, time}: RNBO.MessageEvent) {
  console.log(`output ${tag}: ${this.parse(payload).join(' ')} | ${time}ms`);
  tag?this.output.set([tag, this.parse(payload)]):void 0;
}

effect(id: string, Fn: (msg: [string, number[]]) => void, injector: Injector) {
  this.effects.set(id, effect(() => Fn(this.input()), { injector }));
}
subscribe<Evt extends any>(id: string, s: Subscribable<Evt>, Fn: (val: Evt, sig: Msg) => void,  port: PortType) {
  this.subscriptions.set(id, s.subscribe((val: Evt) => Fn(val, this[port]()))); 
}
  // be careful as passing null to this function will always destroy the inputEffect and outputSubscription
link(id: string, device: RNBO.BaseDevice|null, injector: Injector) {
    this.reset();
    if(device!==null&&id) {
    this.device.set(device);
    // when the input signal changes, schedule the event
    this.effect('debug', (msg: [string, number[]]) => console.log(`input ${msg} ${RNBO.TimeNow}`), injector);
    this.effect(id, (msg: [string, number[]]) => this.device()?.scheduleEvent(this.createMessage(msg)), injector);
    // when the device emits a message, update the output signal
    //device?.messageEvent.subscribe((e: RNBO.MessageEvent) => this.setData(e));
    //device?.messageEvent.subscribe((e: RNBO.MessageEvent) => console.log(`output ${e.tag} ${e.payload}`));
    this.subscribe(id, device?.messageEvent, (e: RNBO.MessageEvent) => this.setData(e), 'output');
   this.subscribe('debug', device?.messageEvent, (e: RNBO.MessageEvent) => console.log(`${e.tag}: ${e.payload} ${e.time}`), 'output');
  }
}
  reset() {
    this.effects.forEach((effectRef: EffectRef) => effectRef.destroy());  
    this.subscriptions.forEach((subscription: RNBO.IEventSubscription) => subscription.unsubscribe());
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