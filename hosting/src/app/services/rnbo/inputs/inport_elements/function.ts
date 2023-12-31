
import * as Nexus from 'nexusui';
import { CustomRNBOInputMetadata } from '../../types/dataTypes';
import { BaseDevice } from '@rnbo/js';
import { ListInportUI } from '../core';
import { BehaviorSubject } from 'rxjs';

export default class EnvelopeUI extends ListInportUI<'function'> {
  domain: number;
  range: [number, number];
  minDomain: number = 1;
  maxDomain: number = 10000;
  sendElement!: any;
  domainElement!: any;
  constructor(
    override meta: CustomRNBOInputMetadata<'List', 'function'>,
    tag: string,
    device: BaseDevice
  ) {
    super(meta, tag, device);
    this.minDomain = this.meta?.minDomain ?? 1;
    this.maxDomain = this.meta?.maxDomain ?? 10000;
    this.domain = this.meta?.domain ?? 1000;
    this.range = this.meta?.range ?? [0, 1];
  }
  createElement() {
    this.domainElement = Nexus.Add.Slider(this.elementId, {
      size: [this.size[0], 20],
      min: 0,
      max: 1000,
      value: this.domain,
    });
    this.element = Nexus.Add.Envelope(this.elementId, { size: this.size });
    this.sendElement = Nexus.Add.TextButton(this.elementId, {
      size: [this.size[0], 20],
      text: 'Send Envelope Data'
    });
  }
  toRange(y: number) {
    return (y - this.range[0]) * (this.range[1] - this.range[0]);
  }
  // playChordByIndex
  parseEvent(points: { x: number; y: number }[]): boolean {
    this.data = points.flatMap((p) => [p.x * this.domain, this.toRange(p.y)]);
    return true;
  }
  linkElementToInput(listener: BehaviorSubject<[string, ...number[]]>): void {
    this.element.on('change', (points: {x: number, y: number}[]) => {
      this.data = points.flatMap((p) => [p.x * this.domain, this.toRange(p.y)]);  
      if((!this.tag)||!this.data.length) {
        listener.next([this.tag, ...this.data]);
      }
    });
    this.domainElement.on('change', (v: number) => {
      this.domain = v;
    });
    this.sendElement.on('change', (v: boolean) => {
      if(v) {
        listener.next([this.tag, ...this.data]);
      }
    });
  }
}
