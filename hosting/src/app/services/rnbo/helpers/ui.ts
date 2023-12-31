import { EnumParameter, NumberParameter } from '@rnbo/js';
import { InputAttributes } from '../types/attributes';
import PianoUI from '../inputs/inport_elements/kslider';
import EnvelopeUI from '../inputs/inport_elements/function';
import { SelectUI } from '../inputs/parameter_elements/select';
import { ToggleUI } from '../inputs/parameter_elements/toggle';
import DialUI from '../inputs/parameter_elements/dial';
import SliderUI from '../inputs/parameter_elements/slider';
import NumberUI from '../inputs/parameter_elements/number';
import TextButtonUI from '../inputs/inport_elements/textbutton';
import { RadioGroupUI } from '../inputs/parameter_elements/radiogroup';
import KeyboardUI from '../inputs/parameter_elements/kslider';

export function initializeInportUIs() {
  for(let i=0; i<this.patcher.desc.inports.length; i++) {
    let desc = this.patcher.desc.inports[i];
    let meta = desc?.meta;
    //console.log(`inport meta`);
    //console.log(meta);
    let name = desc?.tag;
    if(!meta||(meta?.maxobj === 'textedit')) {
      continue;
    }
   // this.uiNames.push(['list', name]);
    
    switch(meta.maxobj) {
        case 'textbutton':
          this.uiElements.set(name, (new TextButtonUI(meta as InputAttributes<'List', 'textbutton'>, name, this.device)));
          break;
        case 'kslider':
          this.uiElements.set(name, (new PianoUI(meta as InputAttributes<'List', 'kslider'>, name, this.device)));
          break;
        case 'function':
          this.uiElements.set(name, (new EnvelopeUI(meta as InputAttributes<'List', 'function'>, name, this.device)));
          break;
        default: 
          throw new Error(`Unknown maxobj ${meta.maxobj}`);
      }
    }
  }
export function initializeParameterUIs() {
  for(let i=0; i<this.patcher.desc.numParameters; i++) {
    let desc = this.patcher.desc.parameters[i];
    let meta = desc?.meta;
    let param = this.device.parameters[i];
    let name = param.name;
   /*  if(this.uis.has(name)) {
      continue;
    } */
    if(desc.isEnum)  {
     // this.uiNames.push(['enum', name]);
      meta ??= {'maxobj': 'umenu'};
      
      switch(meta.maxobj) {
        case 'umenu':
          this.uiElements.set(name, (new SelectUI(meta as InputAttributes<'Enum', 'umenu'>, param as EnumParameter)));
          break;
        case 'toggle':
          this.uiElements.set(name, (new ToggleUI(meta as InputAttributes<'Enum', 'toggle'>, param as EnumParameter)));
          break;
          case 'umenu':
            this.uiElements.set(name, (new RadioGroupUI(meta as InputAttributes<'Enum', 'radiogroup'>, param as EnumParameter)));
            break;
        default: 
          throw new Error(`Unknown maxobj ${meta.maxobj}`);
      }
    }
    else {
      meta ??= {'maxobj': 'dial'};
     // this.uiNames.push(['number', name]);
      switch(meta.maxobj) {
        case 'dial':
          this.uiElements.set(name, (new DialUI(meta as InputAttributes<'Number', 'dial'>, param as NumberParameter)));
          break;
        case 'slider':
          this.uiElements.set(name, (new SliderUI(meta as InputAttributes<'Number', 'slider'>, param as NumberParameter)));
          break;
          case 'number':
            this.uiElements.set(name, (new NumberUI(meta as InputAttributes<'Number', 'number'>, param as NumberParameter)));
            break;
            case 'kslider':
              this.uiElements.set(name, (new KeyboardUI(meta as InputAttributes<'Number', 'kslider'>, param as NumberParameter)));
              break;
        default: 
          throw new Error(`Unknown maxobj ${meta.maxobj}`);
      }
    }
  }
}