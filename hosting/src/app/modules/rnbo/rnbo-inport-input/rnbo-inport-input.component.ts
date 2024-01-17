import { Component, Input, SimpleChanges, effect } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RnboMessagingService } from 'src/app/services/rnbo/messages/rnbo-messaging.service';
@Component({
  selector: 'app-rnbo-inport-input',
  template: `
<mat-form-field>
  <input matInput [formControl]="control" placeholder="input message">
  <mat-error *ngIf="control.hasError('required')">This field is required</mat-error>
  <mat-error *ngIf="control.hasError('invalidNumber')">message must be space-separated numbers</mat-error>
</mat-form-field>
  `,
  styleUrls: ['./rnbo-inport-input.component.scss']
})
export class RnboInportInputComponent {
  @Input() device_id!: string|null;
  @Input() tag_id!: string|null; 
  control = new FormControl<string|null> (null, [Validators.required, this.validateNumbers]);
  subscription: Subscription|null = null;
  constructor(public messageHub: RnboMessagingService) { }
  ngOnChanges(simpleChanges: SimpleChanges) {
    let {device_id, tag_id} = simpleChanges;
    if (device_id || tag_id) {
      if(this.subscription) this.subscription.unsubscribe();
      if(this.device_id && this.tag_id) {
        this.subscription = this.messageHub.bindToControl(this.device_id, this.tag_id, this.control);
        this.control.setValue(this.messageHub.getVal(this.device_id, this.tag_id));
      }
    }
  }
  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }
  validateNumbers(control: FormControl): ValidationErrors | null {
    
    const numbers = control.value?.split(' ') ?? [];
    for (const num of numbers) {
      if (isNaN(Number(num))) {
        return { invalidNumber: true };
      }
    }
    return null;
  }
}
 // I want to make an Angular component that uses Angular Material to create an input with a form control. A validator will check if the input is made up of only space separated numbers.