import { Component } from '@angular/core';
import * as RNBO from '@rnbo/js';
import { WebAudioService } from './services/audio/web-audio.service';
import { FirebaseStorageService } from './services/firebase-storage/firebase-storage.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>`,
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
  
}
