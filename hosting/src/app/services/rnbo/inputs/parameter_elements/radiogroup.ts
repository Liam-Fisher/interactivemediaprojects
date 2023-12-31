import { EnumParameter } from "@rnbo/js";
import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from "../../types/dataTypes";
import { EnumParameterUI } from "../core";

export class RadioGroupUI extends EnumParameterUI<'radiogroup'> {
    constructor(override meta: CustomRNBOInputMetadata<'Enum', 'radiogroup'>, override param: EnumParameter) {
        super(meta, param);
    }
    get selected() {
        return this.element.value;
    }
    createElement() {   // the default mode 'relative' is always used
        this.element =  new Nexus.RadioButton(this.elementId, { size: this.size, options: this.param.enumValues} );
    }
    // fix this???
    parseEvent({value, index}: {value: string, index: number}): number {
        return index;
    }
    updateElement(value: number): void { 
        this.element.value = value;
    }
}