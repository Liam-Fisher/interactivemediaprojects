import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Parameter, RnboParametersService } from 'src/app/services/rnbo/parameters/rnbo-parameters.service';


@Component({
  selector: 'app-rnbo-material-parameter',
  template: `
  <div class="parameter-container" *ngIf="parameter">
    <mat-label>{{ displayName }}</mat-label>
    <mat-select 
    *ngIf="(enumValues?.length)"
    [formControl]="control"
    >
      <mat-option *ngFor="let option of enumValues; let i = index" [value]="i">
        {{ option }}
      </mat-option>
    </mat-select>
    <mat-slider
    *ngIf="!enumValues"
      [min]="min"
      [max]="max"
      [step]="steps"
      [showTickMarks]="meta?.showTickMarks"
      [discrete]="meta?.discrete"
      [displayWith]="formatLabel"
    >
      <input matSliderThumb [formControl]="control" />
    </mat-slider>
</div>
  `,
  styleUrls: ['./rnbo-material-parameter.component.scss'],
})
export class RnboMaterialParameterComponent {
  @Input() device_id!: string|null;
  @Input() parameter_id!: string|null;
  control = new FormControl<number|null>(null);
  subscription: Subscription|null = null;
  parameter: Parameter|null = null;
  constructor(public parameterHub: RnboParametersService) { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    let {device_id, parameter_id} = simpleChanges;
    if (device_id || parameter_id) {
      if(this.device_id && this.parameter_id) {
        this.parameter = this.parameterHub.getObj(this.device_id, this.parameter_id);
        if(!this.parameter) return;
        this.control.setValue(this.parameter.target.value);
        if(this.subscription) this.subscription.unsubscribe();
        this.subscription = this.parameterHub.bindToControl(this.device_id, this.parameter_id, this.control);
      }
    }
  }
  get meta() {
    return this.parameter?.meta;
  }
  get displayName(): string {
    return this.parameter?.target?.displayName ?? this.parameter?.target?.name ?? '';
  }
  get min(): number {
    return this.parameter?.target?.min ?? 0;
  }
  get max(): number {
    return this.parameter?.target?.max ?? 1;
  }
  get steps(): number {
    return this.parameter?.target?.steps ?? 0;
  }
  get enumValues(): string[] {
    return this.parameter?.target?.enumValues ?? [];
  }
  formatLabel(value: number): string {
    return `${value.toFixed(this.meta?.precision ?? 2)}${
      this.meta?.unit ?? ''
    }`;
  }
}
