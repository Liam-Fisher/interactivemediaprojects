import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as RNBO from '@rnbo/js';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IRnboService } from '../helpers';

interface Port {
  target: 'in' | 'out';
  subject: BehaviorSubject<string|null>;
  subscriptions: Subscription[]; // er... do we need this?
  meta: any;
}


@Injectable({
  providedIn: 'root'
})
export class RnboMessagingService extends IRnboService<'in'|'out', string|null, any> {
  // device_id -> port_tag -> port_meta
  map: Map<string, Map<string, Port>>  = new Map();
  constructor() { super(); }

  addDevice(device_id: string, device: RNBO.BaseDevice, patcher: RNBO.IPatcher) {
    this.map.clear();
    const {inports,outports} = patcher.desc;
    for(let {tag,meta} of inports) {
      let obj = this.createObject(device_id, tag, 'in', meta, meta?.initialValue??null);
      this.setObj(device_id, tag, obj);
      
      const subscriber = (value: string|null) => this.sendMessage(device, tag, value);
      this.subscribe(obj, subscriber);
    }
    
    for(let {tag,meta} of outports) {
      let obj = this.createObject(device_id, tag, 'out', meta, meta?.initialValue??null);
      this.setObj(device_id, tag, obj);
    }
    
    // subscribe to all outport message events and forward them to the outport Subject
    this.connectOutportRouter(device_id, device);
  }
  sendMessage(device: RNBO.BaseDevice, key: string, value: string|null) {
    let data = value?.split(' ').map((str: string) => Number(str)).filter((num: number) => !isNaN(num));
    if(data?.length) {
      device.scheduleEvent(new RNBO.MessageEvent(0, key, data));
    }
  }
  connectOutportRouter(device_id: string, device: RNBO.BaseDevice) {
    device.messageEvent.subscribe((event: RNBO.MessageEvent) => {
      let {tag, payload} = event;
      let data = (typeof payload === 'number') ? payload+'' : Array.isArray(payload) ? payload?.join(' ') : '';
      let port = this.getProp(device_id, tag, 'subject');
      if(port&&port?.value !== data) {
        port.next(payload);
      }
    });
  }
}

