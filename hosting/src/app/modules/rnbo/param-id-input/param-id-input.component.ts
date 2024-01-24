import { Component, EventEmitter, Input, Output, SimpleChanges, computed } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { RnboParametersService } from 'src/app/services/rnbo/parameters/rnbo-parameter-connection.service';

@Component({
  selector: 'app-param-id-input',
  template: `
  
<mat-form-field>
  <mat-label>Parameter</mat-label>
  <mat-select [formControl]="selected">
    <mat-option *ngFor="let id of options | async" [value]="id">{{
      id
    }}</mat-option>
  </mat-select>
</mat-form-field>
  `,
  styleUrls: ['./param-id-input.component.scss']
})
export class ParamIdInputComponent {
  @Input() device_id!: string|null;
  selected = new FormControl<string|null>(null);
  options = computed(() => this.parameters.getKeys(this.device_id));
  constructor(public parameters: RnboParametersService) { }
  ngOnChanges(change: SimpleChanges) {
    let new_device_id = change?.['device_id'].currentValue ?? null
    if(new_device_id ) {
      this.options.next(this.parameters.getKeys(new_device_id));
    }
  }
}
