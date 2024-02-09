import { Component, EventEmitter, Inject, Injector, Input, Output } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import * as RNBO from '@rnbo/js';
import { WebAudioService } from 'src/app/services/audio/web-audio.service';
import { FirebaseStorageService } from 'src/app/services/firebase-storage/firebase-storage.service';
import { RnboDeviceService } from 'src/app/services/rnbo/rnbo-device.service';

@Component({
  selector: 'app-rubix-rnbo',
  template:`
  <button (click)="load()">Load</button>
  <p>{{this.path}}</p>
  <p>{{this.device_id}}</p>
  <h4>Basic mat-select</h4>
<mat-form-field>
  <mat-label>Tag</mat-label>
  <mat-select #tag>
    @for (input of rnbo.inputs; track $index) {
      <mat-option [value]="input.tag">{{input.tag}}</mat-option>
    }
  </mat-select>
</mat-form-field>
<mat-form-field>
<mat-label>Data</mat-label>
  <input matInput #data placeholder="Data" (change)="send(tag.value, data.value)">
</mat-form-field>
  `,
  styleUrls: ['./rubix-rnbo.component.scss']
})
export class RubixRnboComponent {
  title = 'interactive-media-projects';
  path = 'rubix';
  device_id = 'rubix_mallet';
  device: RNBO.BaseDevice|null = null;
  patcher: RNBO.IPatcher|null = null;
  subscription: RNBO.IEventSubscription|null = null;
  tgt: string = '';
  data: string = '';
  constructor(public audio: WebAudioService, public storage: FirebaseStorageService, public rnbo: RnboDeviceService, public injector: Injector) {}
  
  set msg(evt: any) {
    this.data = evt?.target?.value ?? '';
  }
  set inport(evt: any) {
    this.tgt = evt?.value ?? '';
  }
  send(tag: string, msg: string) {
    console.log('sending '+tag+' '+msg);
    if(this.device&&tag&&msg) {
      this.rnbo.msg = [tag, msg];
    }
  }
  async load() {
    console.log('loading rubix');
    this.patcher = await this.storage.loadPatcher(this.path, this.device_id);
    console.log('patcher', this.patcher);
    if(this.patcher) {
      this.device = await RNBO.createDevice({ context: this.audio.ctx, patcher: this.patcher});
      if(this.device) {
        console.log('device', this.device);
        this.audio.addNode('device', this.device.node);
        this.rnbo.link(this.device_id, this.device, this.injector); 
        }
    }
  }
}
