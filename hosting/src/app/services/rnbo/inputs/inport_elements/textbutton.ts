
import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from '../../types/dataTypes';
import { BaseDevice } from '@rnbo/js';
import { ListInportUI } from '../core';
import { BehaviorSubject } from 'rxjs';

export default class TextButtonUI extends ListInportUI<'textbutton'> {
  text!: string;
  texton: string|null = null;
  constructor(
    override meta: CustomRNBOInputMetadata<'List', 'textbutton'>,
    tag: string,
    device: BaseDevice
  ) {
    super(meta, tag, device);
    this.text = this.meta?.text ?? 'playing';
    this.texton = this.meta?.texton ?? 'stopped';
    this.sendOnChange = true;
  }
  createElement() {
    if(this.texton) {
      this.element = Nexus.Add.TextButton(this.elementId, {
        size: this.size,
        state: false,
        text: this.text,
        alternateText: this.texton
      });
    }
    else {
      this.element = Nexus.Add.TextButton(this.elementId, {
        size: this.size,
        state: false,
        text: this.text,
        alternateText: this.texton
      });
    }
  }
  linkElementToInput(listener: BehaviorSubject<[string, ...number[]]>) {
    this.element.on('change', (v: boolean) => {
        this.data = [+v];
        if(this.tag&&this.data.length) {
            listener.next([this.tag, ...this.data]);
        }
    });
  }
}
