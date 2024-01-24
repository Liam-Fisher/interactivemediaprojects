import { Component, Injector, Input, Signal, SimpleChanges, WritableSignal, effect, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as RNBO from '@rnbo/js';
import { RnboParameterConnectionService } from 'src/app/services/rnbo/parameters/rnbo-parameter-connection.service';
/* function AddGetters() {
  return function (target: any, key: string) {
    let _val = target[key];
    let getter = function () {
      return _val;
    };
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

@AddGetters([]) */
@Component({
  selector: 'app-rnbo-material-parameter',
  providers: [RnboParameterConnectionService],
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
      [showTickMarks]="showTickMarks"
      [discrete]="discrete"
      [displayWith]="formatLabel"
    >
      <input matSliderThumb [formControl]="control" />
    </mat-slider>
</div>
  `,
  styleUrls: ['./rnbo-material-parameter.component.scss'],
})
export class RnboMaterialParameterComponent {
  // pass the parameter object retrieved from a loaded device
  // the parent component that calls this  
  @Input() parameter!: Signal<RNBO.Parameter|null>;
  @Input() meta!: WritableSignal<any|null>;
  control = new FormControl<number|null>(null);
  subscription: Subscription|null = null;
  // components can be given a tyle parsing service that takes meta as an input and returns a style object

  constructor(public connector: RnboParameterConnectionService, public injector: Injector) { 
    // disconnect and reconnect the parameter when the parameter changes
    effect(()=> { 
      // should add a styling service that takes meta as an input and returns a style object
      //
      this.connector.link(this.parameter(), this.control, injector);
    });
  }
  ngOnInit() {}
  get showTickMarks() {
    return this.meta()?.showTickMarks ?? false;
  }
  get discrete() {
    return this.meta()?.discrete ?? false;
  }
  get displayName(): string {
    return this.parameter()?.displayName ?? this.parameter()?.name ?? '';
  }
  get min(): number {
    return this.parameter()?.min ?? 0;
  }
  get max(): number {
    return this.parameter()?.max ?? 1;
  }
  get steps(): number {
    return this.parameter()?.steps ?? 0;
  }
  get enumValues(): string[] {
    return this.parameter()?.enumValues ?? [];
  }
  get unit(): string {
    return this.parameter()?.unit ?? '';
  }
  get precision(): number {
    return this.meta()?.precision ?? 2;
  }
  formatLabel(value: number): string {
    return `${value.toFixed(this.precision)}${this?.unit ?? ''}`;
  }
}
