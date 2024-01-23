import { EffectRef, Injector, WritableSignal, effect } from "@angular/core";
import { Subscription } from "rxjs";
import { FormControl } from "@angular/forms";
import { BaseDevice, IEventSubscription } from "@rnbo/js";

// signal services: Messaging, 
export type IRnboObject<Data,Meta=any> = {
  sig: WritableSignal<Data>;
  meta: Meta;
  ref?: EffectRef;
}
export abstract class IRnboSignalService<Data, RnboObject extends IRnboObject<Data, any>, Input=string|null> {
    abstract map: Map<string, Map<string, RnboObject>>;
    abstract deviceSubscriptions: Map<string, IEventSubscription>;
    abstract ctlSubscriptions: Map<string, Map<string, Subscription>>; 
    abstract createObject(device_id: string | null, key: string | null, initialValue: Data, ...args: any[]): RnboObject;
    abstract formatData(data: Data): Input;
    abstract parseInput(input: Input): Data | null;
    abstract subscribeToDevice(device_id: string, device: BaseDevice, debug?: boolean): IEventSubscription;
    unsubscribeFromDevice(device_id: string) {
      if(this.deviceSubscriptions.has(device_id)) this.deviceSubscriptions.get(device_id)?.unsubscribe();
    }
    getData(device_id: string | null, key: string | null): Data | null {
      return this.getProp(device_id, key, 'sig')?.() ?? null;
    }
    setData(device_id: string | null, key: string | null, value: Data | null): void {
      return value ? this.getProp(device_id, key, 'sig')?.set(value) : void 0;    
    }
    // the injector should be the injector of the component that is calling this function, passed with addDevice
    createEffect(Fn: ()=>void, obj: RnboObject, injector: Injector) {
      this.removeEffect(obj);
      obj.ref = effect(Fn, {injector});
    }
    removeEffect(obj: RnboObject) {
      if(obj.ref) obj?.ref.destroy();
    }
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
      if (obj !== null && prop !== null && value !== null) {
        obj[prop] = value; 
      }
      return value;
    }
    subscribeToControl( device_id: string | null, key: string | null, ctl: FormControl<Input> ) {
      if(device_id&&key&&this.getObj(device_id, key)) {
        if(!this.ctlSubscriptions.has(device_id)) {
          this.ctlSubscriptions.set(device_id, new Map());
        }
          this.unsubscribeFromControl(device_id, key);
          const subscription = ctl.valueChanges.subscribe((value: Input) => {
            if (ctl?.valid) {
                this.setData(device_id, key, this.parseInput(value));
            }
          });
          this.ctlSubscriptions.get(device_id)?.set(key, subscription); 
      }
    }
    unsubscribeFromControl(device_id: string | null, key: string | null) {
      if(device_id&&key) {
          this.ctlSubscriptions.get(device_id)?.get(key)?.unsubscribe();
      }
    }
    bindToControl(device_id: string | null, key: string | null, injector: Injector, ctl: FormControl<Input>
    ) {
      this.subscribeToControl(device_id, key, ctl);
      this.emitToControl(device_id, key, injector, ctl)
    }
    emitToControl(
      device_id: string | null,
      key: string | null,
      injector: Injector,
      control: FormControl<Input>
    ) {
      const obj = this.getObj(device_id, key);
      const sig = obj?.sig;
      if (obj &&sig) {
        this.createEffect(obj, injector, () => control.setValue(this.formatData(sig())));
      }
    }
    removeDevice(device_id: string) {
    this.map.get(device_id)?.forEach((v: RnboObject) => this.removeEffect(v));
    this.ctlSubscriptions.get(device_id)?.forEach((v: Subscription) => v.unsubscribe());
    this.unsubscribeFromDevice(device_id);
    this.map.delete(device_id);
    }
  }
  
  