import { RadioGroupUI } from "../inputs/parameter_elements/radiogroup";

export type GlobalAttributes = {
  bgcolor?:[number, number, number, number];
  bordercolor?:[number, number, number, number];
  rect?: [number, number, number, number];
}

export type TextStyle = {
  bgcolor?:[number, number, number, number];
  textcolor?:[number, number, number, number];
  fontsize?: number;
  fontname?: string;
  fontface?: 0|1|2|3;//'regular'|'italic'|'bold'|'bold italic';
}
// IGNORE radiogroup, pan, and textbutton
export type InputAttributeMap = {
    Number: {
      dial: {
        vtracking?: 0|1; // 'radial' | 'vertical';
        // there is no correspoding property on the nexus vui object, but this will set the background container
        bgcolor?:[number, number, number, number];
        // the nexus ui mode property does not existing on the corresponding max object
        outlinecolor?:[number, number, number, number];
        needlecolor?: [number, number, number, number];
      };
      number: TextStyle&{
        bgcolor?:[number, number, number, number];
        textcolor?:[number, number, number, number];
      };
      slider: {
        relative: 0|1; // 'absolute |relative 
        // there is no correspoding property on the nexus vui object, but this will set the background container
        bgcolor?:[number, number, number, number];
        elementcolor?:[number, number, number, number];
        knobcolor?: [number, number, number, number];
      };
      kslider: {
        offset?: number;
        range: number;
        hkeycolor?: [number, number, number, number];
        whitekeycolor?:[number, number, number, number];
        blackkeycolor?:[number, number, number, number];
      };
      //no fully corresponding maxobj
      //pan: {}
    };
    Enum: {
      umenu: TextStyle;
      radiogroup: {};
      toggle: {
        checkedcolor?: [number, number, number, number];
        uncheckedcolor?: [number, number, number, number];
      };
      //no fully corresponding maxobj, could implement
       // textbutton: TextStyle&{};
       
      // no fully corresponding rnbo parameter ?? 
       // radiogroup: TextStyle&{};
    };
    List: {
      message: TextStyle;
      textbutton: {
        text?: string;
        texton?: string;
      };
      kslider: {
        mode?: 'lead'|'chord'|'touch'; //  'toggle' | 'button'
        isPolyphonic?: boolean;
        offset?: number;
        range: number;
        hkeycolor?: [number, number, number, number];
        whitekeycolor?:[number, number, number, number];
        blackkeycolor?:[number, number, number, number];
        sendOnChange?: boolean
      };
      function: {
        minDomain?: number
        maxDomain?: number
        domain?: number
        range?: [number, number]
        linecolor?: [number, number, number, number];
        bgcolor?: [number, number, number, number];
        sendOnChange?: boolean
      };
      pictslider: {
        jump: 0|1 // i.e. mode 'absolute'|'relative';
        color?: [number, number, number, number]; // accent
        // the drag property of the max object - elementcolor?: [number,number,number,number]
        bgcolor?: [number, number, number, number]; // bgcolor
        bottomvalue: number;
        topvalue: number;
        leftvalue: number;
        rightvalue: number;
        // value is automatically set to the middle 
      };
      multislider: {
        slidercolor?: [number, number, number, number]; // accent
        bgcolor?: [number, number, number, number]; // bgcolor
        size: number // => numberOfSliders // add a number for changing this, would have to destory and rebuild the element.
        // mode = 'bar'
      };
      matrixctrl: { // => Nexus.Sequencer
        mode: 'toggle'
        columns: number; // 1 column used for voicings
        rows: number; // 1 row used for rhythms
        horizontalspacing?: number; // paddingColumn
        verticalspacing?: number; // paddingRow
        // implement class methods for these - they are too useful to ignore
        'one/column': boolean; // e.g. contour
        'one/row': boolean; // e.g. vociing ??
        'one/matrix': boolean; // e.g. presets
      };
  };
    Message: {
      textedit: TextStyle;
    };
  };
  
  export type InputType = keyof InputAttributeMap;
  
  export type NumberInputType = keyof InputAttributeMap['Number'];
  export type EnumInputType = keyof InputAttributeMap['Enum'];
  export type ListInputType = keyof InputAttributeMap['List'];
  export type MessageInputType = keyof InputAttributeMap['Message'];
  
  export type UIType<T extends InputType> = keyof InputAttributeMap[T];
  
  export type GenericAttributes = Record<string, string> & {
    maxobj: string;
    intype: InputType;
    annotation?: string;
    hint?: string;
    messageOnly?: boolean;
    rect?: [number, number, number, number];
    minSize?: [number, number];
};

export type InputAttributes<T extends keyof InputAttributeMap, UI extends UIType<T>> = InputAttributeMap[T][UI]&GenericAttributes;


