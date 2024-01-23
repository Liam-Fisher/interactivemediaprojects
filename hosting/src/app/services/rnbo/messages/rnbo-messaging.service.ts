import {
  EffectRef,
  Injectable,
  Injector,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import * as RNBO from '@rnbo/js';
import { IRnboObject, IRnboSignalService } from '../abstract_classes/signalService';
import { Subscription } from 'rxjs';

type PortData = number[] | null;
type PortMeta = any;
type Port = IRnboObject<PortData, PortMeta>;

@Injectable({
  providedIn: 'root',
})
export class RnboMessagingService extends IRnboSignalService< PortData, Port > {
  // device_id -> port_tag -> port_meta
  deviceSubscriptions = new Map<string, RNBO.IEventSubscription>();
  ctlSubscriptions = new Map<string, Map<string, Subscription>>();
  map: Map<string, Map<string, Port>> = new Map();
  constructor() {
    super();
  }
  parseInput(input: any): PortData | null {
    let data = input?.split(' ').map((v: string) => Number(v)).filter((v: number) => !isNaN(v));
    return data?.length ? data : null;
  }
  formatData(data: number[]): string {
    return data?.join(' ') ?? '';
  }
  createObject(device_id: string | null, key: string | null, meta: PortMeta, initialValue: any): Port {
    if(!device_id || !key) throw new Error('device_id or key is null');
    if(this.map.get(device_id)?.has(key)) throw new Error(`port ${device_id}.${key} already exists`);
    const obj = {meta, sig: signal(initialValue)};
    this.setObj(device_id, key, obj);
    return obj;  
  }
  addDevice(
    device_id: string,
    device: RNBO.BaseDevice,
    patcher: RNBO.IPatcher,
    injector: Injector,
    debug = false
  ) {
    const { inports, outports } = patcher.desc;

    for (let { tag, meta } of inports) {
      const obj = this.createObject( device_id, tag, meta, meta?.initialValue ?? null);
      const sig = obj.sig;
      this.createEffect(() => this.sendMessage(device, tag, sig?.()), obj, injector);
    }

      for (let { tag, meta } of outports) {
        this.createObject(device_id, tag, meta, meta?.initialValue ?? null);
    }

      this.unsubscribeFromDevice(device_id);
      this.deviceSubscriptions.set(device_id, this.subscribeToDevice(device_id, device, debug));
  }
  subscribeToDevice(device_id: string, device: RNBO.BaseDevice, debug = false) {
    return device.messageEvent.subscribe((event: RNBO.MessageEvent) => {
      if (debug) console.log('messageEvent', event);
      let { tag, payload } = event;
      let data = payload ? Array.isArray(payload) ? payload : [payload] : null;
      this.setData(device_id, tag, data);
    });
  }
  sendMessage(device: RNBO.BaseDevice, key: string, data: PortData) {
    if (data !== null) {
      device.scheduleEvent(new RNBO.MessageEvent(0, key, data));
    }
  }
}
