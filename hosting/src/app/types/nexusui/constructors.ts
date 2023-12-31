 
// accent, fill, dark, light, mediumDark, mediumLight
type nexusColors = 'accent'|'fill'|'dark'|'mediumDrak'|'mediumLight';
// Missing: Toggle RadioGroup, Pan
type LiveObjectElementMap = {
    "button": "Button"
    "dial": "Dial",
    "number": "Number",
    "slider": "Slider",
    "step": "Sequencer" // the live object is in matrix mode
}
type MaxObjectElementMap = {
    "pictslider": "Position"
    "function": "Envelope",
    "multislider": "Multislider",
    "kslider": "Piano",
    "nodes": "Pan2D"
}

export interface NexusButtonElementParams {
    'size': [80,80],
    'mode': 'button'|'impulse'|'aftertouch'|'toggle',
    'state': false
}
export interface ElementStyling {
    'accent': [number, number, number],
    'fill': [number, number, number],
    'dark': [number, number, number],
    'light': [number, number, number],
    'mediumDark': [number, number, number],
    'mediumLight': [number, number, number]
}
export interface DialStyleParams {
    size: [number, number];
    interaction: 'radial'|'vertical'; // ignore horizontal
    mode: 'relative'|'absolute';
    step: number;
    min: number;
    max: number;
    value: number;
}
export interface NexusPianoElementParams {
    size: [number, number];
    mode: 'button'|'toggle'|'impulse';
    lowNote: number;
    highNote: number;
}

export interface UI {
    type: 'live'|'max';
    element: keyof (LiveObjectElementMap|MaxObjectElementMap);
  //  params: NexusButtonElementParams|NexusDialElementParams|NexusPianoElementParams;
    styling: ElementStyling;
    position: [number, number];
    rect: [number, number, number, number];
    container_size: [number, number];
    value: number;
} 