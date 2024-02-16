import { Component, Injector } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { WebAudioService } from 'src/app/services/audio/web-audio.service';
import { FirebaseStorageService } from 'src/app/services/firebase-storage/firebase-storage.service';
import { RnboDeviceService } from 'src/app/services/rnbo/rnbo-device.service';
import { RubixSceneService } from 'src/app/services/rubix/rubix-scene/rubix-scene.service';

@Component({
  selector: 'app-rubix-rnbo',
  template:`
  <button mat-button (click)="load()">Load Audio</button> <!-- 
  @if(device !== null) {
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
  } -->
  `,
  styleUrls: ['./rubix-rnbo.component.scss']
})
export class RubixRnboComponent {
  title = 'interactive-media-projects';
  path = 'rubix';
  device_id = 'rubix_v1';
  device: RNBO.BaseDevice|null = null;
  patcher: RNBO.IPatcher|null = null;
  subscription: RNBO.IEventSubscription|null = null;
  tgt: string = '';
  data: string = '';
  constructor(public audio: WebAudioService, public storage: FirebaseStorageService, public rnbo: RnboDeviceService, public injector: Injector, public scene: RubixSceneService) {}
  
  set msg(evt: any) {
    this.data = evt?.target?.value ?? '';
  }
  set inport(evt: any) {
    this.tgt = evt?.value ?? '';
  }
  send(tag: string, msg: string) {
   // console.log('sending '+tag+' '+msg);
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
        //  console.log('device', this.device);
        //  console.log('node', this.device.node);
          this.audio.ctx.resume();
          this.device.node.connect(this.audio.ctx.destination);
          this.rnbo.link(this.device_id, this.device, this.injector); 
          this.send('facePattern', '0 1 0 1 2 1 0 2 2 0 0 1 2 1 2 0 2 1 2 1');
          this.send('facePattern', '1 1 2 1 2 1 0 1 2 1 2 0 0 1 1 0 2 1 2 0');
          this.send('facePattern', '2 1 1 2 3 2 0 1 1 0 1 2 3 2 1 1 1 1');
          this.scene.linkDevice();
        }
    }
  }
}
