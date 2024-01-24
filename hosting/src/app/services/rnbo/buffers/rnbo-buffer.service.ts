import { Injectable, Injector, signal } from '@angular/core';
import { FirebaseStorageService } from '../../firebase-storage/firebase-storage.service';
import { WebAudioService } from '../../audio/web-audio.service';
import * as RNBO from '@rnbo/js';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { IRnboObject, IRnboSignalService } from '../abstract_classes/signalService';


// multibuffers are not written too since they contain no unique data, and are a device-local structure for organizing buffers
// Float64Buffers can also be ignored ?? 
type BufferType = 'Float64MultiBuffer '| 'Float32MultiBuffer' | 'Float32Buffer' | 'Float64Buffer' ;
type BufferID = string | number;
// BufferSource is a string, an AudioBuffer, or an array of Float32Arrays or ArrayBuffers (the latter two have lengths indicating the number of channels)
type BufferSource = string | AudioBuffer | (ArrayBuffer|Float32Array)[] | null;
interface BufferMetaData { // more precise RNBO.ExternalDataInfo 
    id: string;
    type: BufferType;
    file?: string;
    url?: string; // i haven't generated an export with this property yet, but it might pop up. in c=any case, it is treated the same as file
    tag?: 'buffer'|'buffer~'|'data'; // multibuffers do not have a tag property, which we can use to exclude them, 
}
export interface BufferLoadData {
    device_id: string,
    buffer_id: BufferID,
    src: BufferSource|null
}
type IBufferData = Promise<AudioBuffer|null>;
type IBuffer = IRnboObject<AudioBuffer|null, BufferMetaData>;
// IMPORTANT: this will link buffers between devices if they have the same buffer_id and the "buffer~" tag
// if you want to avoid this, use the "data" object instead of the "buffer" object in the patcher
@Injectable({
  providedIn: 'root'
})
export class RnboBufferService extends IRnboSignalService<AudioBuffer|null, IBuffer, BufferSource> {
  // has an additional map in the form: device_id -> buffer_id -> buffer
  buffers = new Map<string, Map<string, AudioBuffer>>();
  map: Map<string, Map<string, IBuffer>> = new Map();
  ctlSubscriptions = new Map<string, Map<string, Subscription>>();  
  deviceSubscriptions = new Map<string, RNBO.IEventSubscription>();
  isLoading = signal<[string,string]|null>(null);

  constructor(public storage: FirebaseStorageService, public audio: WebAudioService) { super(); }
  

  parseInput(input: BufferSource): AudioBuffer|null {
    if(input instanceof AudioBuffer) return input;
    if(input instanceof Array) return this.audio.createAudioBuffer(input);
    return null; // we'll have to call this.getAsAudioBuffer(input) in our components to allow loading from a url
  }
  createObject(device_id: string | null, key: string | null, initialValue: AudioBuffer|null, meta: BufferMetaData): IBuffer {
    const obj = { audiobuffer: null, sig: signal(initialValue), meta };
    this.setObj(device_id, key, obj);
    return obj;
  }
  async addDevice(device_id: string, device: RNBO.BaseDevice, patcher: RNBO.IPatcher, injector: Injector) {
    
    let refs = patcher.desc.externalDataRefs as BufferMetaData[];
    let bufferMeta = (patcher.desc.meta as any)?.buffers
    for(let {id, type, file, url, tag} of refs) {
          if(tag&&type === 'Float32Buffer' ) { // not a multibuffer and can be written too... Float64Buffers are not compatible with the web audio api
            let meta = bufferMeta?.[id]??null;
            // the buffer target is null, 
            // if file or url is not null, then the subject will be updated with the fetched buffer when it is loaded
            // else, the buffer will be released and the target will be updated with the device's default buffer on load
            const initialValue = await this.getAsAudioBuffer(file??url??null);
            const obj = this.createObject(device_id, id, initialValue, meta);
            const sig = obj.sig;
            this.createEffect(() => this.setBuffer(device_id, device, id, sig()), obj, injector);
        }
  }
}
// this is a bit of a hack, but it works
// send null to release the buffer, if it's empty, it will be replaced with the device's default buffer
async setBuffer(device_id: string, device: RNBO.BaseDevice, buffer_id: string, buffer: BufferSource) {
  let value  = await this.getAsAudioBuffer(buffer);
  if(value===null) {
    let data = await device.releaseDataBuffer(buffer_id);
    if(data.buffer.byteLength) {
      value = data.getAsAudioBuffer(this.audio.ctx);
    }
  }
  else {
    await device.setDataBuffer(buffer_id, value);
  }
  this.setData(device_id, buffer_id, value);
}

  getAsBufferID(device_id: string, buffer_id: string|number): string {
    if(typeof buffer_id === 'string') {
      return buffer_id;
    }
    let keys = this.getKeys(device_id);
    if( keys.length<=buffer_id) {
     throw new Error(`buffer_id ${buffer_id} is out of range for device ${device_id}`);
    }
    else {
      return keys[buffer_id];
    }
  }
  async getAsAudioBuffer(buffer_src: BufferSource) {
    if(buffer_src instanceof AudioBuffer || buffer_src === null) {
      return buffer_src;
    }
    if (typeof buffer_src === 'string') {
      return this.storage.loadAudio(this.audio.ctx, buffer_src);
    }
      return this.audio.createAudioBuffer(buffer_src);
  }
}
