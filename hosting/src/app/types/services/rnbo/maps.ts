import { BehaviorSubject, Subscription } from 'rxjs';
import * as RNBO from '@rnbo/js';
import { FormControl } from '@angular/forms';
export type RnboServiceMap<T extends RnboObject> = Map<string, Map<string, T>>;
export type RnboObject<Target = any, Data = any, Meta = any> = {
  target: Target | null;
  subject: BehaviorSubject<Data>;
  meta: Meta;
  subscriptions: Subscription[];
};
/* 
export abstract class IRnboService<Target, Data, Meta> {
  abstract map: RnboServiceMap<RnboObject<Target, Data, Meta>>;
  getKeys(device_id: string | null): string[] {
    return Array.from(this.map.get(device_id ?? '')?.keys() ?? []);
  }
  getVal(device_id: string | null, key: string | null): Data | null {
    return this.getObj(device_id, key)?.subject.value ?? null;
  }
  setVal(device_id: string | null, key: string | null, value: Data): void {
    this.getObj(device_id, key)?.subject.next(value);
  }
  getObj(
    device_id: string | null,
    key: string | null
  ): RnboObject<Target, Data, Meta> | null {
    if (!device_id || !key) return null;
    return this.map.get(device_id)?.get(key) ?? null;
  }
  setObj(
    device_id: string | null,
    key: string | null,
    value: RnboObject<Target, Data, Meta>
  ): void {
    if (!device_id || !key) return;
    if (!this.map.has(device_id)) {
      this.map.set(device_id, new Map());
    }
    this.map.get(device_id)?.set(key, value);
  }
  getProp<Prop extends keyof RnboObject>(
    device_id: string | null,
    key: string | null,
    prop: Prop | null
  ): RnboObject[Prop] | null {
    return prop ? this.getObj(device_id, key)?.[prop] ?? null : null;
  }
  setProp<Prop extends keyof RnboObject>(
    device_id: string | null,
    key: string | null,
    prop: Prop | null,
    value: RnboObject[Prop] | null
  ): void {
    let obj = this.getObj(device_id, key);
    if (obj && prop && value) {
      obj[prop] = value;
    }
  }

  subscribe(
    obj: RnboObject<Target, Data, Meta>,
    subscriber: (v: Data) => void
  ) {
    obj.subscriptions.push(obj.subject.subscribe(subscriber));
  }
  unsubscribeAll(device_id: string) {
    this.map.get(device_id)?.forEach((obj) => {
      obj.subscriptions.forEach((sub) => {
        sub.unsubscribe();
      });
    });
  }

  createObject(
    device_id: string,
    key: string,
    target: Target,
    meta: Meta,
    intialValue: Data
  ): RnboObject<Target, Data, Meta> {
    let subscriptions: Subscription[] = [];
    let subject = new BehaviorSubject<Data>(intialValue);
    return { target, subject, meta, subscriptions };
  }
  removeObject(device_id: string, key: string) {
    let obj = this.getObj(device_id, key);
    if (obj) {
      obj.subscriptions.forEach((sub) => sub.unsubscribe());
      this.map.get(device_id)?.delete(key);
    }
  }
  abstract addDevice(
    device_id: string,
    device: RNBO.BaseDevice,
    patcher: RNBO.IPatcher
  ): void;
  // Timing: null, Parameter: device, id -> RNBO.Parameter, Port: null, Preset: patcher -> RNBO.IPreset, Buffer: RNBO.IBuffer
  //abstract initializeTarget(): Target;
  //abstract initializeSubject(): BehaviorSubject<Data|null>;

  // abstract createObject(device_id: string, key: string, subscriber: (v: Data)=> void): void

  //abstract update(device_id: string, key: string, value: TData): void;
  //abstract createSubject(device_id: string, key: string, initial?: Data): void;
  //abstract subscriber(device: RNBO.BaseDevice, device_id: string, key: string): void;
  //abstract addSubscription(device_id: string, key: string, value: TData): void;
  //abstract setMeta(device_id: string, key: string, value: TData): void;
} */
