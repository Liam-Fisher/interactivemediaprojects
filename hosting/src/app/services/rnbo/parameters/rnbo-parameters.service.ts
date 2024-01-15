import { Injectable } from '@angular/core';
import { computed } from '@angular/core';
import * as RNBO from '@rnbo/js';

// hub for parameter changes

// operates on a pubsub model between device parameters and ui components 
@Injectable({
  providedIn: 'root'
})
export class RnboParametersService {

  parameters = new Map<string, RNBO.Parameter>();
  constructor() { }
  reset() {
    this.parameters.clear();
  }
  async loadParameters(device: RNBO.BaseDevice) {
    this.parameters.clear();
    for (let [id, parameter] of device.parameters) {
      this.parameters.set(id, parameter);
    }
  }
  subscribeToParameterUI(id: string, callback: (value: number) => void) {
    let changeEvent = this.parameters.get(id).changeEvent as RNBO.EventSubject<number>;
    if (changeEvent) {
      changeEvent.subscribe(callback);
    }
  
  }
}
