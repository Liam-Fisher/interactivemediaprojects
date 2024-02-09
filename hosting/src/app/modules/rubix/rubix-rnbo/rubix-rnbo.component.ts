import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { WebAudioService } from 'src/app/services/audio/web-audio.service';
import { FirebaseStorageService } from 'src/app/services/firebase-storage/firebase-storage.service';

@Component({
  selector: 'app-rubix-rnbo',
  template:`
  <p>{{this.path}}</p>
  <p>{{this.device_id}}</p>
  `,
  styleUrls: ['./rubix-rnbo.component.scss']
})
export class RubixRnboComponent {
  title = 'interactive-media-projects';
  path = 'rubix';
  device_id = 'iter_test';
  device: RNBO.BaseDevice|null = null;
  patcher: RNBO.IPatcher|null = null;
  subscription: RNBO.IEventSubscription|null = null;
  constructor(public audio: WebAudioService, public storage: FirebaseStorageService) {}
  async load() {
    console.log('loading rubix');
    this.patcher = await this.storage.loadPatcher(this.path, this.device_id);
    console.log('patcher', this.patcher);
    if(this.patcher) {
      this.device = await RNBO.createDevice({ context: this.audio.ctx, patcher: this.patcher});
      if(this.device) {
        console.log('device', this.device);
        this.audio.addNode('device', this.device.node);
        this.subscription = this.device.messageEvent.subscribe((e: RNBO.MessageEvent) => console.log('message', e));
      }
    }
  }
}
