import { EffectRef, Injectable, Injector, WritableSignal, signal } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { IRnboObject, IRnboSignalService } from '../abstract_classes/signalService';
import { Subscription } from 'rxjs';
// hub for parameter changes

export type IParameter = IRnboObject<number, any>&{
  param: RNBO.Parameter;
};


// operates on a pubsub model between device parameters and ui components
@Injectable({
  providedIn: 'root',
})
export class RnboParametersService extends IRnboSignalService<number, IParameter, number|null> {
  // this contains all parameters for all devices
  map = new Map<string, Map<string, IParameter>>();
  ctlSubscriptions = new Map<string, Map<string, Subscription>>();
  deviceSubscriptions=  new Map<string, RNBO.IEventSubscription>();

  constructor() { super(); }
  parseInput(input: number|null): number|null {
    return input;
  }
  formatData(data: number): number {
    return data;
  }
  async addDevice(
    device_id: string,
    device: RNBO.BaseDevice,
    patcher: RNBO.IPatcher,
    injector: Injector,
    debug = false
  ) {
    this.map.clear();
    for (let i = 0; i < patcher.desc.numParameters; i++) {

      let desc = patcher.desc.parameters[i] as any; // TODO: type this to include meta
      const meta = desc?.meta;
      const param = device.parameters[i] as RNBO.Parameter;

      const obj = this.createObject(device_id, param.name, param, meta, param.initialValue);
      const sig = obj.sig;
      this.createEffect(() => param.value = sig(), obj, injector);
    }
    this.deviceSubscriptions.set(device_id, this.subscribeToDevice(device_id, device));
  }
  subscribeToDevice(device_id: string, device: any): RNBO.IEventSubscription {
    return device.parameterChangeEvent.subscribe((param: RNBO.Parameter) => {
          this.setData(device_id, param.name, param.value);
        });
  }
  createObject(device_id: string | null, key: string | null, param: RNBO.Parameter, meta: any, initialValue: number): IParameter {
    const sig = signal(initialValue);
    const obj = {param, meta, sig};
    this.setObj(device_id, key, obj);
    return obj;
  }
}

