import { Component, Input, Signal, ViewChild, WritableSignal, signal } from '@angular/core';
import { FormControl, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RnboMessagingService } from 'src/app/services/rnbo/messages/rnbo-messaging.service';
import { TagInputComponent } from '../../tag-input/tag-input.component';
import * as RNBO from '@rnbo/js';


@Component({
  selector: 'app-rnbo-inport-input',
  template: `
  <form #f="ngForm" (ngSubmit)="sendValue(f)">
  <app-port-tag-select [tag]="tag_id"></app-port-tag-select>
<app-port-message-text-input  [payload]="payload"></app-port-message-text-input>
<button mat-button type="submit" [disabled]="!f.valid">Send</button> 
</form>
  `,
  styles: [
    ``
  ]
})
export class RnboInportInputComponent {
  @Input() device!: Signal<RNBO.BaseDevice>;
  @Input() tag_id: WritableSignal<string> = signal('');
  payload: WritableSignal<number[]> = signal([]);
  constructor(public messaging: RnboMessagingService) { }
  sendValue(f: NgForm) {
    console.log(`form value: ${JSON.stringify(f.value)}`);
    if(f.valid) {
      this.messaging.input.set([this.tag_id(), this.payload()]);
    } 
  }
}