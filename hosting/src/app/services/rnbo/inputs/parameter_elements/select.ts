import { EnumParameter } from "@rnbo/js";
import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from "../../types/dataTypes";
import { EnumParameterUI } from "../core";

export class SelectUI extends EnumParameterUI<'umenu'> {
    constructor(override meta: CustomRNBOInputMetadata<'Enum', 'umenu'>, override param: EnumParameter) {
        super(meta, param);
    }
    get selected() {
        return this.element.value;
    }
    createElement() {
    // the default mode 'relative' is always used
        this.element =  Nexus.Add.Select(this.elementId, { size: this.size, options: this.param.enumValues} );
    }
    parseEvent({value, index}: {value: string, index: number}): number {
        return index;
    }
    updateElement(value: number): void { 
        this.element.selectedIndex = value;
    }
}