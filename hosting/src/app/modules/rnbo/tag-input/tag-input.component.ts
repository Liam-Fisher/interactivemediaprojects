import { Component,  Host,  Input, Output, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { RnboMessagingService } from 'src/app/services/rnbo/messages/rnbo-messaging.service';


@Component({
  selector: 'app-tag-input',
  template: `
  <mat-slide-toggle [ngModel]="port_type()" (ngModelChange)="port_type.set($event?'inports':'outports')">
<mat-form-field>
  <mat-label>{{port_type()}}</mat-label>
  <mat-select [ngModel]="tag()" (ngModelChange)="tag.set($event)">
    <mat-option *ngFor="let id of ports()" [value]="id">{{
      id
    }}</mat-option>
  </mat-select>
</mat-form-field>
`,
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent {
  /* viewInportControl = signal(true); */
  port_type: WritableSignal<'inports'|'outports'> = signal('inports');
  tag: WritableSignal<string> = signal('');
  ports = computed(() => this.messaging[this.port_type()]());
  constructor(@Host() public messaging: RnboMessagingService) { }
}
