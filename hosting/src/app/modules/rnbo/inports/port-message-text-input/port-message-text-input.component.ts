import { Component, Input, WritableSignal, signal } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-port-message-text-input',
  template: `
<mat-form-field [formControl]="inputControl">
  <input matInput placeholder="input message">
  <mat-error *ngIf="inputControl.hasError('required')">This field is required</mat-error>
  <mat-error *ngIf="inputControl.hasError('invalidNumber')">message must be space-separated numbers</mat-error>
</mat-form-field>
  `,
  styles: [
    ``
  ]
})
export class PortMessageTextInputComponent {
  @Input() payload!: WritableSignal<number[]>;
  inputControl = new FormControl<string|null> (null, [Validators.required, this.validateNumbers]);
  subscription!: Subscription;
  constructor() { }
  ngOnInit() {
    this.subscription = this.inputControl.valueChanges.subscribe((value: string|null) => {
      if (value&&this.inputControl.valid) {
        this.payload.set(this.parseValue(this.inputControl));
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  parseValue(data: FormControl) {
    return data.value.split(' ').map(Number);
  }
  validateNumbers(data: FormControl): ValidationErrors | null {
    const numbers = this.parseValue(data);
    for (const num of numbers) {
      if (isNaN(num)) {
        return { invalidNumber: true };
      }
    }
    return null;
  }
}
