import { NumberParameter } from "@rnbo/js";
import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from "../../types/dataTypes";
import { NumberParameterUI } from "../core";
export default class NumberUI extends NumberParameterUI<'number'> {

    constructor(override meta: CustomRNBOInputMetadata<'Number', 'number'>,  param: NumberParameter) {
            super(meta, param);
    }     
  createElement() {
    let {min, max, value} = this.param;
    let {step, size} = this;
// the default mode 'relative' is always used
    //console.log({ size, min, max, step, value})
    this.element =  new Nexus.Number(this.elementId, { size, min, max, step, value} );

  }
  parseEvent(v: number): number {
    return this.value;
  }
  updateElement(value: number): void { 
    this.element.value = value;
}
  
} 