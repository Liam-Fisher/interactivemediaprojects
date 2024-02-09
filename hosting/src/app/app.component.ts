import { Component } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { WebAudioService } from './services/audio/web-audio.service';
import { FirebaseStorageService } from './services/firebase-storage/firebase-storage.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  template: `
  <button (click)="load()">Load Rubix</button>
  @if(isLoaded|async){
    <app-rubix></app-rubix>
  }
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    p {
      
    }
  `]
})
export class AppComponent {
  title = 'interactive-media-projects';
  path = 'rubix';
  device_id = 'iter_test';
  device: RNBO.BaseDevice|null = null;
  patcher: RNBO.IPatcher|null = null;
  subscription: RNBO.IEventSubscription|null = null;
  isLoaded = new BehaviorSubject<boolean>(false);
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
        this.isLoaded.next(true);
      }
    }
  }
}
