import { Component,  Input,  Signal,  WritableSignal,  computed } from '@angular/core';
import { RnboMessagingService } from 'src/app/services/rnbo/messages/rnbo-messaging.service';

@Component({
  selector: 'app-tag-input',
  template: `
<mat-form-field>
  <mat-label>Tag</mat-label>
  <mat-select [(ngModel)]="tag_id">
    <mat-option *ngFor="let id of options()" [value]="id">{{
      id
    }}</mat-option>
  </mat-select>
</mat-form-field>
`,
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent {
  options = computed(() => this.messaging.getKeys(this.device_id()));
  @Input() device_id!: Signal<string>;
  @Input() tag_id!: WritableSignal<string>; 
  constructor(public messaging: RnboMessagingService) { }
}
