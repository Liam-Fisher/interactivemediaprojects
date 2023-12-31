import { EnumParameter, IPatcher, IPatcherDescription, NumberParameter } from "@rnbo/js";
import { GenericAttributes, InputAttributes, InputType, UIType } from "./attributes";

export type CustomRnboStyle = {
    conditions: {
        "max-width"?: number
        "min-width"?: number
        "isTouch"?: boolean
    },
    data: Record<string, string>
}

export type CustomRNBOMetadata = IPatcherDescription['meta']&{
    styles: {
        [key: string]: CustomRnboStyle
    }
}



export type CustomRNBOInputMetadata<T extends InputType, UI extends UIType<T>> = InputAttributes<T, UI> & GenericAttributes;

export type CustomRNBOInport<T extends 'List'|'Message', UI extends UIType<T>> = {
    tag:string
    meta: InputAttributes<T, UI> & GenericAttributes;
};



export type NumberUIData = {
    param: NumberParameter;
    meta: CustomRNBOInputMetadata<'Number', UIType<'Number'>>;
}
export type EnumUIData = {
    param: EnumParameter;
    meta: CustomRNBOInputMetadata<'Enum', UIType<'Enum'>>;
}
export type ListUIData = {
    tag: string;
    meta: CustomRNBOInputMetadata<'List', UIType<'List'>>;
}
export type MessageUIData = {
    tag: string;
    meta: CustomRNBOInputMetadata<'Message', UIType<'Message'>>;
}
