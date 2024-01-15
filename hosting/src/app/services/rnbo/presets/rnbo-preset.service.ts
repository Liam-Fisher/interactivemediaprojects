import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as RNBO from '@rnbo/js';
@Injectable({
  providedIn: 'root',
})
export class RnboPresetService {
  presets = new Map<string, RNBO.IPreset>();
  presetNames = new BehaviorSubject<string[]>([]);
  constructor() {
    this.reset();
  }
  reset() {
    this.presets.clear();
    this.presetNames.next([]);
  }
  async loadPreset(patcher: RNBO.IPatcher) {

    let presetNames = [];
    this.presets.clear();

    if (patcher.presets) {
      for (let {name, preset} of patcher.presets) {
        presetNames.push(name);
        this.presets.set(name, preset);
      }
      this.presetNames.next(presetNames);
    }
  }
  async updatePreset(device: RNBO.BaseDevice, preset_id: string) {
    let activePreset = this.presets.get(preset_id);
    if(activePreset) {
      device.setPreset(activePreset);
    }
    return activePreset;
  }
}
