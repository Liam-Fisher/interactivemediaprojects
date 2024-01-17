import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { RnboLoaderService } from 'src/app/services/rnbo/loader/rnbo-loader.service';
import { RnboMessagingService } from 'src/app/services/rnbo/messages/rnbo-messaging.service';
import { RnboParametersService } from 'src/app/services/rnbo/parameters/rnbo-parameters.service';
import { RnboDeviceComponent } from '../rnbo-device/rnbo-device.component';
// this is kind of a monster component but it's mostly for debugging
// specifically, it encapsulates a device and all of its parameters and inports in a single component, so that you can load a device and then play with it right away
// usually, you would load 

@Component({
  selector: 'app-rnbo-global-input',
  template: `
<mat-form-field>
  <mat-label>Device Name</mat-label>
  <mat-select [formControl]="idFormControl">
    <mat-option *ngFor="let id of storedDeviceOptions | async" [value]="id">{{
      id
    }}</mat-option>
  </mat-select>
</mat-form-field>

<app-rnbo-device
  *ngIf="idFormControl.value !== null"
  [device_id]="idFormControl.value"
  (loadedEvent)="loadOptions($event)"
></app-rnbo-device>

<mat-form-field>
  <mat-label>Parameter</mat-label>
  <mat-select [formControl]="paramFormControl">
    <mat-option *ngFor="let id of parameterOptions | async" [value]="id">{{
      id
    }}</mat-option>
  </mat-select>
</mat-form-field>

<app-rnbo-material-parameter
  *ngIf="paramFormControl.value !== null"
  [device_id]="idFormControl.value"
  [parameter_id]="paramFormControl.value"
>
</app-rnbo-material-parameter>

<mat-form-field>
  <mat-label>Tag</mat-label>
  <mat-select [formControl]="tagFormControl">
    <mat-option *ngFor="let id of tagOptions | async" [value]="id">{{
      id
    }}</mat-option>
  </mat-select>
</mat-form-field>

<app-rnbo-inport-input
  *ngIf="tagFormControl.value !== null"
  [device_id]="idFormControl.value"
  [tag_id]="tagFormControl.value"
>
</app-rnbo-inport-input>

    
  `,
  styleUrls: ['./rnbo-global-input.component.scss']
})
export class RnboGlobalInputComponent {
  @Input() device_folder: string = 'testing';
  idFormControl = new FormControl<string|null>(null, [ Validators.required ]);
  tagFormControl = new FormControl<string|null>(null, [ Validators.required ]);
  paramFormControl = new FormControl<string|null>(null, [ Validators.required ]);

  // these are for select ui components
  selectedDevice = new BehaviorSubject<string|null>(null);
  storedDeviceOptions = new BehaviorSubject<string[]>([]);
  tagOptions = new BehaviorSubject<string[]>([]);
  parameterOptions = new BehaviorSubject<string[]>([]);
  constructor(public loader: RnboLoaderService, public parameterHub: RnboParametersService, public messageHub: RnboMessagingService) {}
  ngOnInit() { }
  ngAfterViewInit() {
    this.loader.loadFolderMap().then(() => {  
      console.log(this.loader.deviceIDMap); 
      this.storedDeviceOptions.next(this.loader.getDeviceIDs(this.device_folder));
    });
  }
  loadOptions(event: string|null)  {
    this.tagOptions.next(this.messageHub.getKeys(event));
    this.parameterOptions.next(this.parameterHub.getKeys(event));
  }
  get loaded(){
    return this.idFormControl.value !== null ? this.idFormControl.value : 'no device loaded';
  }
}
