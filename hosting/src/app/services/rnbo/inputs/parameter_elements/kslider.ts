import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from '../../types/dataTypes';
import { NumberParameter } from '@rnbo/js';
import {  NumberParameterUI } from '../core';
import { BehaviorSubject } from 'rxjs';


// Lead mode plays one note at a time, and the key is released when the next key is pressed.
export default class KeyboardUI extends NumberParameterUI<'kslider'> {
  lowNote: number;
  highNote: number;
  sendStack: boolean[] = [];
  activeKey!: number;
  send: boolean = true;
  constructor(
    override meta: CustomRNBOInputMetadata<'Number', 'kslider'>,
    param: NumberParameter
  ) {
    super(meta, param);
    this.lowNote = this.meta?.offset ?? 0;
    this.highNote =
      (this.meta?.range ?? 24) + (this.meta?.offset ?? this.lowNote);
      this.activeKey = this.value;
  }
  createElement() {
    let mode = 'toggle';
    let { size, highNote, lowNote } = this;
    this.element = Nexus.Add.Piano(this.elementId, {
      size,
      mode,
      lowNote,
      highNote,
    });
    if(this.meta?.hkeycolor) {
      this.element.colorize("accent", this.meta.hkeycolor);
    }
    else {
      this.element.colorize("accent", "#00BFFF");
    }
    this.updateElement(this.activeKey);
  }
  parseEvent({ note, state }: { note: number; state: boolean }): number {
    if(state) {
      this.element.toggleKey(this.activeKey, false);
      this.activeKey = note;
      return note;
    }
    else {
      this.activeKey = this.value;
      return this.value;
    }
  }
  override linkElementToInput(listener: BehaviorSubject<[string, ...number[]]>) {
    this.element.on(
      'change',
      ({ note, state }: { note: number; state: boolean }) => {
        // There are four types of events that can occur, in 2 pairs (A1, A2), (B1, B2)

        this.sendStack.push(state);
        let key = this.activeKey;
        let isRepeat = key === note; //
        if (isRepeat && !state) { // A1 - existing note off
          this.element.toggleKey(note, true); // turn key back on, triggering event type A2 - existing note on
        }
        if (!isRepeat && state) { // B1 - new note on
          this.activeKey = note; // set new active key
          this.element.toggleKey(key, false); // turn off previous key triggering event type B2 - previous note off
        }
        if (this.sendStack.pop() && !isRepeat && this.value !== note) {
          this.param.value = note;
        }
      }
    );
  }
  updateElement(value: number): void {
    //console.log(`updating element ${this.elementId} to ${value}`);
    this.send = false;
    this.element.toggleKey(this.activeKey, false);
    this.element.toggleKey(value, true);
    this.send = true;
  }
}
