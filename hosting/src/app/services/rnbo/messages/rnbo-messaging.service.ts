import {
  EffectRef,
  Injectable,
  Injector,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import * as RNBO from '@rnbo/js';
import { IRnboObject } from '../abstract_classes/signalService';
import { Subscription } from 'rxjs';


type PortData = number[] | null;
type PortMeta = any;
type Port = IRnboObject<PortData, PortMeta>;

@Injectable({
  providedIn: 'root',
})
export class RnboMessagingService {
  // device_id -> port_tag -> port_meta
  device!: Signal<RNBO.BaseDevice>;
  // use these to create computed signals in consumer components
  input = signal<[string, number[]]>(['', []]);
  output = signal<[string, number[]]>(['', []]); 
  inports = computed(() => [...this.device().inports.map((p) => p.tag)]);
  outports = computed(() => [...this.device().outports.map((p) => p.tag)]);

  inportMetadata = new Map<string, PortMeta>();
  outportMetadata = new Map<string, PortMeta>();
  // instead of a form control, we bind to the signal in our inport/outport components
  inputEffect!: EffectRef;
  outputSubscription!: RNBO.IEventSubscription;
  constructor() { }
parseOutputMessage(event: RNBO.MessageEvent) {
  let { tag, payload } = event;
  if(typeof tag === 'string' ) {
    if(typeof payload === 'number') {
      this.output.set([tag, [payload]]);
    }
    else if(Array.isArray(payload)) {
      this.output.set([tag, payload]);
    }
    else {
      this.output.set([tag, []]);
    }
  }
}
  deviceSubscription(device: RNBO.BaseDevice, debug = false) {
    return device.messageEvent.subscribe((event: RNBO.MessageEvent) => {
      if (debug) console.log('messageEvent', event);
      this.parseOutputMessage(event);
    });
  }
  formatInputMessage(device: RNBO.BaseDevice) {
      device.scheduleEvent(new RNBO.MessageEvent(0, ...this.input()));
    }
  link(
    device: RNBO.BaseDevice,
    injector: Injector,
    debug = false
  ) {
    const { inports, outports } = device;
    for(let { tag, meta } of inports) {
          this.inportMetadata.set(tag, meta);
    }
    this.inputEffect = effect(() => this.formatInputMessage(device), {injector});
    for(let { tag, meta } of outports) {
          this.outportMetadata.set(tag, meta);
    }
    this.outputSubscription = this.deviceSubscription(device, debug);
  }
  destroy() {
    this.inputEffect.destroy();
    this.outputSubscription.unsubscribe();
  }
}
/* 
}
    const { inports, outports } = patcher.desc;

    for (let { tag, meta } of inports) {
      const initialValue = meta?.initialValue ?? null;
      const obj = this.createObject( device_id, tag, meta, initialValue);
      const sig = obj.sig;
    }
      for (let { tag, meta } of outports) {
        this.createObject(device_id, tag, meta, meta?.initialValue ?? null);
    }

      this.unsubscribeFromDevice(device_id);
      this.deviceSubscriptions.set(device_id, this.subscribeToDevice(device_id, device, debug));
 */
  
  

