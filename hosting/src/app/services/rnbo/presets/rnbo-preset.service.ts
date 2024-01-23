import { Injectable, Injector, signal } from '@angular/core';
import {  Subscription } from 'rxjs';
import * as RNBO from '@rnbo/js';
import { RnboParametersService } from '../parameters/rnbo-parameters.service';
import { IRnboObject, IRnboSignalService } from '../abstract_classes/signalService';

type cmd = 'get' | 'set' | null;
type Preset = IRnboObject<cmd, any> & {
  preset: RNBO.IPreset;
}
// could add extra methods for directly setting a preset from JSON
@Injectable({
  providedIn: 'root',
})
export class RnboPresetService extends IRnboSignalService<
  cmd,
  Preset,
  string
> {
  loading = signal<[string, string]|null>(null);
  selectedPresets = new Map<string, string>();
  ctlSubscriptions = new Map<string, Map<string, Subscription>>();
  deviceSubscriptions = new Map<string, RNBO.IEventSubscription>();
  map = new Map<string, Map<string, Preset>>();
  constructor(public parameterHub: RnboParametersService) {
    super();
  }
  parseInput(input: string): cmd {
    if(input === 'get' || input === 'set') return input;
    return null;  
  }
  formatData(data: cmd): string {
    return data??'';
  }
  async addDevice(
    device_id: string,
    device: RNBO.BaseDevice,
    patcher: RNBO.IPatcher,
    injector: Injector,
  ) {
    this.map.clear();
    if (patcher.presets) {
      let initialPreset = patcher.presets[0].name;
      let presetMetas = (patcher.desc.meta as any)?.presets ?? null;
      for (let i = 0; i < patcher.presets.length; i++) {
        const { name, preset } = patcher.presets[i];
        const meta = presetMetas?.[name] ?? null;
        const initialValue = name === initialPreset ? 'get' : null;
        const obj = this.createObject(device_id, name, initialValue, preset, meta);
        const sig = obj.sig;
        this.createEffect(() => this.changePreset(device_id, device, name, sig(), preset), obj, injector);
      }
    }
  }
  // we're not going to call this by default, as it would update the preset every time any parameter is changed
  subscribeToDevice(device_id: string, device: RNBO.BaseDevice, debug?: boolean | undefined): RNBO.IEventSubscription {
      return device.presetTouchedEvent.subscribe(() => {
          this.setData(device_id, this.selectedPresets.get(device_id)??'', 'get');
      });
  }
  createObject(device_id: string|null, preset_id: string|null, initialValue: cmd, preset: RNBO.IPreset, meta: any): Preset {
    const obj = {preset, meta, sig: signal(initialValue)};
    this.setObj(device_id, preset_id, obj);
    return obj;
  }
  async changePreset(device_id: string, device: RNBO.BaseDevice, key: string, value: cmd, preset: RNBO.IPreset) {  
    if(value&&preset)  {
      this.selectedPresets.set(device_id, key);
      if(value==='get') {
        this.loading.set([device_id, key]);
        this.setProp(device_id, key, 'preset', await device.getPreset().then((preset) => {
          this.loading.set(null);
          return preset;
        })
        );
      }
    else {
      device.setPreset(preset);
    }
    for(let key in preset) {
      let value = (preset[key] as any)?.value;
      this.parameterHub.setData(device_id, key, value??null);
    }
  }
  }
}
