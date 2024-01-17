import * as RNBO from '@rnbo/js';
import { interval } from 'rxjs';
// Meta

/**
 * @description the UI metadata for a device inport
 * @param hint - a hint for the user e.g. "midi note number"
 * @param description - a description of the inport e.g. "the note on frequency as a midi note number"
 * @param effect - a full description of the message's effects  e.g. "this sets the frequency of an oscillator and triggers the envelope"
 */

export interface UIMetadata {
  hint?: string;
  description?: string;
  effect?: string;
}

/**
 * @description the NexusUI elements that can be used for a number parameter
 *
 * For {@link RNBO.NumberParameter}
 * @param _Dial - a dial/number pair
 * @param _Slider - a slider
 */

export enum NumberParameterUIElements {
  Dial,
  Slider,
}
export interface NumberParameterMetadata extends UIMetadata {
  element?: keyof typeof NumberParameterUIElements;
}

/**
 * @description the NexusUI elements that can be used for a number parameter
 *
 * For {@link RNBO.EnumParameter}
 * @param Toggle - a toggle, sends 1 when on, 0 when off
 * @param Select - a dropdown menu, sends an index for an enum.
 * @param RadioButton - (default) a radio button, sends an index for an enum.
 */

export enum EnumParameterUIElements {
  Toggle,
  Select,
  RadioButton,
}

export interface EnumParameterMetadata extends UIMetadata {
  element?: keyof typeof EnumParameterUIElements;
}

export type ParameterMetadata<T extends 'enum' | 'number'> = T extends 'enum'
  ? EnumParameterMetadata
  : NumberParameterMetadata;

/**
 * @description the NexusUI elements that can be used for an inport
 * @param _Text -  "input" element, checked for type number[]
 * @param _Button - sends 1 when on, 0 when off
 * @param _Position - a 2D position input, always normalized to [-1, 1]
 * @param _Toggle - a toggle, sends 1 when on, 0 when off
 * @param _Envelope - an envelope, sends an array of normalized x,y pairs
 * @param _Multislider - a multislider / number pair, sends an array of values always with a max and min
 * @param _Piano - a piano, sends an array of midi note numbers, or a single midi note number
 * @param _Sequencer - a matrix of 0s and 1s, sends a 2D array of 0s and 1s
 */
export enum InportUIElements {
  _Text,
  _Button,
  _Position,
  _Toggle,
  _Envelope,
  _Multislider,
  _Piano,
  _Sequencer,
}

type NexusColor = 'accent'|'fill'|'dark'|'mediumDrak'|'mediumLight';
export type NexusUIElement<Data=any> = {
  size: [number, number];
  resize: (width: number, height: number) => void;
  on: (event: string, callback: (data: Data) => void) => void;
  destroy: () => void;
  colorize: (theme: NexusColor, color: string) => void;
}

export type NexusToggleElement = NexusUIElement<boolean>&{
  state: boolean;
  flip: () => void;
};
type NexusPosition = {x: number, y: number};
type NexusButtonMode = 'button'|'impulse'|'aftertouch'|'toggle';

export type NexusButtonElement<Mode extends NexusButtonMode> = NexusUIElement<Mode extends 'aftertouch'?NexusPosition:boolean> &{
  mode: Mode;
};

export type NexusSliderElement = NexusUIElement<number>&{
  mode: 'absolute'|'relative';
  value: number;
  min: number;
  max: number;
  step: number;
};
export type NexusDialElement = NexusSliderElement&{
  interaction: 'radial'|'vertical'|'horizontal';
};

export type NexusNumberElement = NexusSliderElement&{
  link: (target: NexusSliderElement|NexusDialElement) => void;
};
export type NexusMatrix = {
  pattern: number[][];
  toggle: {
    cell: (column: number, row: number) => void;
    column: (column: number) => void;
    row: (row: number) => void;
    all: () => void;
  }
  set: {
    cell: (column: number, row: number, value: number) => void;
    column: (column: number, values: number[]) => void;
    row: (row: number, values: number[]) => void;
    all: (values: number[][]) => void;
  }
  rotate: {
    column: (column: number, amount?:number) => void;
    row: (row: number, amount?:number) => void;
    all: (amount?:number) => void;
  }
  populate: {
    all: (value: number[]) => void;
    column: (column: number, value: number[]) => void;
    row: (row: number, value: number[]) => void;
  }
}
export type NexusInterval = {
  start: (interval?: number) => void;
  stop: () => void;
  ms: (interval: number) => void;
  event: (callback: () => void) => void;
}
export type NexusCounter = {
  min: number;
  max: number;
  mode: 'up'|'down'|'drunk'|'random';
  value: number;
  next: () => void;
}
type SequencerEventData = number[]|{
  column: number;
  row: number;
  state: boolean;
}
export type NexusSequencerElement = NexusUIElement<SequencerEventData>&{
columns: number;
rows: number;
matrix: NexusMatrix;
stepper: NexusCounter;
next: () => void;
// ... using setInterval for now
//interval: NexusInterval;
//start: (interval?: number) => void;
//stop: () => void;

};
