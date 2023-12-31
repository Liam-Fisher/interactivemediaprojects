import { NumberParameter } from "@rnbo/js";
import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from "../../types/dataTypes";
import { NumberParameterUI } from "../core";
export default class SliderUI extends NumberParameterUI<'slider'> {
  numberElement: any;
    constructor(override meta: CustomRNBOInputMetadata<'Number', 'slider'>,  param: NumberParameter) {
            super(meta, param);
    }     
  createElement() {
    let mode = this.meta?.relative ? 'absolute' : 'relative';
    let {min, max, value} = this.param;
    let {step, size} = this;
    this.element =  new Nexus.Slider(this.elementId, { size, mode, min, max, step, value} );
    if(this.meta?.elementcolor) {
      this.element.colorize("accent", this.meta.elementcolor);
    }
    else {
      this.element.colorize("accent", "#00BFFF");
    }
/*     this.numberElement = Nexus.Add.Number(this.elementId, {size: [20, 20], value: this.value});
    this.numberElement.link(this.element); */
  }
  parseEvent(v: number): number { 
    return v;
  }
  updateElement(value: number): void { 
    this.element.value = value;
}
} 