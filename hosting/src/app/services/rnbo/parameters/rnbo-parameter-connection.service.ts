import { EffectRef, ElementRef, Injectable, Injector, WritableSignal, effect, signal } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { IRnboObject, IRnboSignalService } from '../abstract_classes/signalService';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
// hub for parameter changes
type ParameterEffect = (val: number) => void;
export type IParameter = IRnboObject<number, any>&{
  param: RNBO.Parameter;
};
type ParameterMetadata = any; // for now...

// operates on a pubsub model between device parameters and ui components
@Injectable()
export class RnboParameterConnectionService  {
  // the rnbo api parameter object
  parameter: RNBO.Parameter | null = null;
  // a form control (within the component) associated with this parameter
  formControl!: FormControl<number| null>;

  // a signal that is updated when the parameter changes
  signal!: WritableSignal<number>;
  // a subscription to the parameter change event
  eventSubscription: RNBO.IEventSubscription | null = null;
  // a subscription to the form control value changes
  controlSubscription: Subscription | null = null;
  // a list of effects that are called when the signal changes, including updating the parameter value and the form control value
  effects: EffectRef[] = [];

  constructor() { }
  link(
    parameter: RNBO.NumberParameter,
    formControl: FormControl<number|null>,  
    // the injector of the component that is bound to this parameter
    // other, lower level components can listen to the signal and update their values accordingly
    injector: Injector,
    debug = false
  ) {
      this.destroy();
      this.parameter = parameter;
      this.formControl = formControl;
      // create the initial signal 
      this.signal = signal(parameter.initialValue);
      this.eventSubscription = parameter.changeEvent.subscribe((v: number) => this.signal.set(v));
      this.addEffect((v: number) => this.parameter.value = v, injector);

      this.controlSubscription = this.formControl.valueChanges.subscribe((v: number|null) => {
          if(v!==null&&this.formControl.valid) {
              this.signal.set(v);
          }
      });
      this.addEffect((v: number) => this.formControl.setValue(v), injector);

      if(debug) {
        this.addEffect((v: number) => console.log(`updated signal to${v}`), injector);
      }
    }
  // if the injectionContext is destroyed or destroy is called on this service, the effect will be destroyed
  addEffect(Fn: (val: number) => void, injector: Injector) {
    this.effects.push(effect(() => Fn(this.signal()), {injector}));
  }
  destroy() {
    this.eventSubscription?.unsubscribe();
    this.controlSubscription?.unsubscribe();
    this.effects.forEach((effectRef: EffectRef) => effectRef.destroy());
  }
}

