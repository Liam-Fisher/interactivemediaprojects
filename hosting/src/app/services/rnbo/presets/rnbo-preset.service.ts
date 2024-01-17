import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as RNBO from '@rnbo/js';
import { RnboParametersService } from '../parameters/rnbo-parameters.service';
import { IRnboService } from '../helpers';
type cmd = 'get' | 'set' | null;
type Preset = {
  target: RNBO.IPreset;
  // get will call device.getPreset() and set the current value of the stored preset to the values of the device
  subject: BehaviorSubject<cmd>;
  subscriptions: Subscription[];
  meta: any;
};

@Injectable({
  providedIn: 'root',
})
export class RnboPresetService extends IRnboService<
  RNBO.IPreset,
  cmd,
  any
> {
  isLoading = new BehaviorSubject<[string, string]|null>(null);
  selectedPresets = new Map<string, string>();
  map = new Map<string, Map<string, Preset>>();
  constructor(public parameterHub: RnboParametersService) {
    super();
  }
  async addDevice(
    device_id: string,
    device: RNBO.BaseDevice,
    patcher: RNBO.IPatcher
  ) {
    this.map.clear();
    if (patcher.presets) {
      let presetMetas = (patcher.desc.meta as any)?.presets ?? null;
      for (let i = 0; i < patcher.presets.length; i++) {
        const { name, preset } = patcher.presets[i];
        const meta = presetMetas?.[name] ?? null;
        
        let obj = this.createObject(device_id, name, preset, meta, null);
        this.setObj(device_id, name, obj);

        let subscriber = (v: cmd) => {
          this.isLoading.next([device_id, name]);
          this.changePreset(device_id, device, name, v, preset).then(() => {
            this.isLoading.next(null)
          });
        };
        this.subscribe(obj, subscriber);
      }
    }
  }
  async changePreset(device_id: string, device: RNBO.BaseDevice, key: string, value: cmd, preset: RNBO.IPreset) {  
    if(value&&preset)  {
      this.selectedPresets.set(device_id, key);
      if(value==='get') {
        this.setProp(device_id, key, 'target', await device.getPreset());
      }
    else {
      device.setPreset(preset);
    }
    for(let key in preset) {
      let value = (preset[key] as any)?.value;
      let param = this.parameterHub.getProp(device_id, key, 'target');
      if(value&&param&&param?.value!==value) {
        param.value = value;
      }
    }
  }
  }
}
