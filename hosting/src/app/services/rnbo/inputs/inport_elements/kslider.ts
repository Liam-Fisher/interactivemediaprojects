import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from '../../types/dataTypes';
import { BaseDevice } from '@rnbo/js';
import { ListInportUI } from '../core';
import { BehaviorSubject } from 'rxjs';


// Lead mode plays one note at a time, and the key is released when the next key is pressed.
export default class PianoUI extends ListInportUI<'kslider'> {
  lowNote: number;
  highNote: number;
  sendStack: boolean[] = [true];
  send: boolean = true;
  constructor(
    override meta: CustomRNBOInputMetadata<'List', 'kslider'>,
    tag: string,
    device: BaseDevice
  ) {
    super(meta, tag, device);
    this.lowNote = this.meta?.offset ?? 36;
    this.highNote =
      (this.meta?.range ?? 36) + (this.meta?.offset ?? this.lowNote);
    this.data = [Math.floor((this.lowNote + this.highNote) / 2)];
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
  }
  linkElementToInput(listener: BehaviorSubject<[string, ...number[]]>) {
    this.element.on(
      'change',
      ({ note, state }: { note: number; state: boolean }) => {
        // There are four types of events that can occur, in 2 pairs (A1, A2), (B1, B2)
        if (!(this.tag && this.data.length)) {
          return;
        }
        this.sendStack.push(state);
        let key = this.data[0]; // get active key
        let isRepeat = key === note; //
        if (isRepeat && !state) { // A1 - existing note off
          this.element.toggleKey(note, true); // turn key back on, triggering event type A2 - existing note on
        }
        if (!isRepeat && state) { // B1 - new note on
          this.data = [note]; // set new active key
          this.element.toggleKey(key, false); // turn off previous key triggering event type B2 - previous note off
        }
        if (this.sendStack.pop() && !isRepeat && this.send) {
          listener.next([this.tag, ...this.data]);
        }
      }
    );
  }
}
