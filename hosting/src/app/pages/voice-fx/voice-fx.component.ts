import { ChangeDetectorRef, Component } from '@angular/core';
import { ToneService } from 'src/app/services/tone/tone.service';
import * as NEXUS from 'nexusui';
@Component({
  selector: 'app-voice-fx',/* 
  templateUrl: './voice-fx.component.html', */
  template: `
  <button (click)="startAudio()">Start Audio</button>
  <p>Audio is running: {{toneService.isRunning | async}}</p>
`,
  styleUrls: ['./voice-fx.component.scss']
})
export class VoiceFxComponent {
  
  constructor(public toneService: ToneService) { }
  startAudio() {
    this.toneService.getContext();
  }
}
