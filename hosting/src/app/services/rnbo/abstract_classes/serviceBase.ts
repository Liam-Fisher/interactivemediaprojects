import { FormControl } from '@angular/forms';
import * as RNBO from '@rnbo/js';
import { Subscription } from 'rxjs';

export abstract class IRnboService<RnboObject, Data, Input> {
  abstract map: Map<string, Map<string, RnboObject>>;
  abstract createObject(device_id: string | null, key: string | null, initialValue: Data, ...args: any[]): RnboObject;
  abstract getData(device_id: string | null, key: string | null): Data | null;
  abstract setData(device_id: string | null, key: string | null, value: Data | null): void;
  abstract parseInput(input: Input): Data | null;
  getKeys(device_id: string | null): string[] {
    return [...this.map.get(device_id ?? '')?.keys()??[]];
  }
  getObj(device_id: string | null, key: string | null): RnboObject | null {
    if (!device_id || !key) return null;
    return this.map.get(device_id)?.get(key) ?? null;
  }
  setObj(device_id: string | null, key: string | null, value: RnboObject|null) {
    if (device_id && key && value) {
    if (!this.map.has(device_id)) {
      this.map.set(device_id, new Map());
    }
    this.map.get(device_id)?.set(key, value);
}
  }
  getProp<Prop extends keyof RnboObject>(device_id: string | null,key: string | null,prop: Prop | null): RnboObject[Prop] | null {
    return prop ? this.getObj(device_id, key)?.[prop] ?? null : null;
  }
  setProp<Prop extends keyof RnboObject>(device_id: string | null,key: string | null, prop: Prop | null,value: RnboObject[Prop] | null):  RnboObject[Prop] | null {
    let obj = this.getObj(device_id, key);
    if (obj && prop && value) {
      obj[prop] = value as NonNullable<RnboObject>[Prop]; // this is a hack to get around the fact that the compiler doesn't know that prop is not null
    }
    return value;
  }
  listenToControl( device_id: string | null, key: string | null, ctl: FormControl<Input> ): Subscription | null {
    if (this.getObj(device_id, key)) { 
      return ctl.valueChanges.subscribe((value: Input) => {
        if (ctl?.valid) {
          this.setData(device_id, key, this.parseInput(value));
        }
      });
    }
    return null;
  }
}

