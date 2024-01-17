import { Injectable } from '@angular/core';
import { computed } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { RnboLoaderService } from '../loader/rnbo-loader.service';
import { Form, FormControl } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IRnboService } from '../helpers';

// hub for parameter changes

export interface Parameter {
  target: RNBO.Parameter;
  subject: BehaviorSubject<number | null>;
  subscriptions: Subscription[]; // type this later
  meta: any; // type this later
}

// operates on a pubsub model between device parameters and ui components
@Injectable({
  providedIn: 'root',
})
export class RnboParametersService extends IRnboService<RNBO.Parameter, number | null, any> {
  // this contains all parameters for all devices
  map = new Map<string, Map<string, Parameter>>();
  constructor() { super();}
  
  async addDevice(
    device_id: string,
    device: RNBO.BaseDevice,
    patcher: RNBO.IPatcher
  ) {
    this.map.clear();
    for (let i = 0; i < patcher.desc.numParameters; i++) {
      let desc = patcher.desc.parameters[i] as any; // TODO: type this to include meta
      let meta = desc?.meta;
      let target = device.parameters[i];

      let subjectSubscriber = (value: number | null) => {
        if ((value === null)||(target.value === value)) return;
          target.value = value;
      };

      let obj = this.createObject(device_id, target.name, target, meta, target.initialValue);
      this.setObj(device_id, target.name, obj);
      this.subscribe(obj, subjectSubscriber);

      let {subscriptions, subject} = obj;

      target.changeEvent.subscribe((value: number) => {
        if ((subject.value !== value)) subject.next(value);
      });
    }
  }
  
}

