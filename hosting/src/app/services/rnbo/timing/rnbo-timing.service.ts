import { Injectable } from '@angular/core';

import * as RNBO from '@rnbo/js';
import { IRnboService, RnboObject } from '../helpers';


// timesignature: [number, number]; -> number 
// 00000000
@Injectable({
  providedIn: 'root'
})
export class RnboTimingService extends IRnboService<null, number[]|null, any> {
  readonly defaultValues = {
    transportstate: [1], 
    beattime: [0], 
    tempo: [120], 
    timesignature: [4,4]
  };
  map = new Map();
  constructor() { 
    super();
  }
  addDevice(device_id: string, device: RNBO.BaseDevice, patcher: RNBO.IPatcher) {
    this.map.clear();
    let meta: any;
    let intialValue: number[];
    let obj: RnboObject<null, number[]|null, any>;
      // these are just different enough to not be able to use the same function :(

      const transportstatesubscriber = (value: number[]|null) => value?.length ? device.scheduleEvent(new RNBO.TransportEvent(0, value[0])) : null;
      meta = (patcher.desc?.meta as any)?.transportstate;
      intialValue = meta?.initialValue as number[] ?? this.defaultValues.transportstate; // 1 = playing
      obj = this.createObject(device_id, 'timesignature', null, meta, intialValue);
      this.setObj(device_id, 'transportstate', obj);
      this.subscribe(obj, transportstatesubscriber);

      const beattimesubscriber = (value: number[]|null) => value?.length ? device.scheduleEvent(new RNBO.BeatTimeEvent(0, value[0])) : null;
      meta = (patcher.desc?.meta as any)?.beattime;
      intialValue = meta?.initialValue as number[] ?? this.defaultValues.beattime;
      obj = this.createObject(device_id, 'timesignature', null, meta, intialValue);
      this.setObj(device_id, 'beattime', obj);
      this.subscribe(obj, beattimesubscriber);


      const temposubscriber = (value: number[]|null) => value?.length ? device.scheduleEvent(new RNBO.TempoEvent(0, value[0])) : null;
      meta = (patcher.desc?.meta as any)?.tempo;
      intialValue = meta?.initialValue as number[] ??  this.defaultValues.tempo;
      obj = this.createObject(device_id, 'timesignature', null, meta, intialValue);
      this.setObj(device_id, 'tempo', obj);
      this.subscribe(obj, temposubscriber);

      const timesignaturesubscriber = (value: number[]|null) => value?.length===2 ? device.scheduleEvent(new RNBO.TimeSignatureEvent(0, value[0], value[1])) : null;
      meta = (patcher.desc?.meta as any)?.timesignature;
      intialValue = meta?.initialValue as number[] ??  this.defaultValues.timesignature;
      obj = this.createObject(device_id, 'timesignature', null, meta, intialValue);
      this.setObj(device_id, 'timesignature', obj);
      this.subscribe(obj, timesignaturesubscriber);

    }
}
