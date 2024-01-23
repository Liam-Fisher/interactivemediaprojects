import { Component, Input, Signal, WritableSignal } from '@angular/core';
import { FormControl, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RnboMessagingService } from 'src/app/services/rnbo/messages/rnbo-messaging.service';
@Component({
  selector: 'app-rnbo-inport-input',
  template: `
  <form #f="ngForm" (ngSubmit)="sendValue(f)">
<app-tag-input [device_id]="device_id" [tag_id]="tag_id"></app-tag-input>
<mat-form-field [formControl]="messageInputControl">
  <input matInput placeholder="input message">
  <mat-error *ngIf="messageInputControl.hasError('required')">This field is required</mat-error>
  <mat-error *ngIf="messageInputControl.hasError('invalidNumber')">message must be space-separated numbers</mat-error>
</mat-form-field>
<button mat-button type="submit">Send</button> 
</form>
  `,
  styles: [
    ``
  ]
})
export class RnboInportInputComponent {
  @Input() device_id!: Signal<string>;
  @Input() tag_id!: WritableSignal<string>;
  // add a an input type option that conditionally renders ui components of the selected type e.g. toggle, input, keyboard
  /* 
  @ViewChild(TagInputComponent) tagInput!: TagInputComponent; */
  messageInputControl = new FormControl<string|null> (null, [Validators.required, this.validateNumbers]);

  subscription: Subscription|null = null;
  constructor(public messageHub: RnboMessagingService) { }
  sendValue(f: NgForm) {
    console.log(`form value: ${JSON.stringify(f.value)}`);
    if(f.valid) {
      this.messageHub.setSig(this.device_id(), this.tag_id(), this.messageHub.parseInput(this.messageInputControl?.value??''));
    } 
  }
  validateNumbers(data: FormControl): ValidationErrors | null {
    const numbers = data.value?.split(' ') ?? [];
    for (const num of numbers) {
      if (isNaN(Number(num))) {
        return { invalidNumber: true };
      }
    }
    return null;
  }
}
 // I want to make an Angular component that uses Angular Material to create an input with a form control. A validator will check if the input is made up of only space separated numbers.