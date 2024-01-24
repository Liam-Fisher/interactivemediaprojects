import { Component, Host, Input, WritableSignal, computed, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RnboMessagingService } from 'src/app/services/rnbo/messages/rnbo-messaging.service';

@Component({
  selector: 'app-port-tag-select',
  template: `
<mat-form-field>
 
<mat-label>{{port_type()}}</mat-label>
<mat-slide-toggle [ngModel]="port_type()" (change)="updateType($event)" ()>
</mat-slide-toggle>
</mat-form-field>
 <mat-form-field>
  <mat-label>{{port_type()}}</mat-label>
  <mat-select [ngModel]="tag()" (selectionChange)="updateTag($event)">
    <mat-option *ngFor="let id of ports()" [value]="id">{{
      id
    }}</mat-option>
  </mat-select>
</mat-form-field>
`,
  styleUrls: ['./port-tag-select.component.scss']
})
export class PortTagSelectComponent {
  port_type: WritableSignal<'inports'|'outports'> = signal('inports');
  @Input() tag!: WritableSignal<string>;
  ports = computed(() => this.messaging[this.port_type()]());
  constructor(@Host() public messaging: RnboMessagingService) { }
  updateTag(selectEvent: {value: string}) {
    this.tag.set(selectEvent.value);
  }
  updateType(toggleEvent: {checked: boolean}) {
    this.port_type.set(toggleEvent.checked?'inports':'outports');
  }
}
