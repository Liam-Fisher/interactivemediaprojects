import * as RNBO from '@rnbo/js';
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
