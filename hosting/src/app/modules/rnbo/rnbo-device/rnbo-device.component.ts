
import { ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { AudioService } from 'src/app/services/webAudio/audio.service';

type DeviceOptions = 'none'|'robot'|'alien';
@Component({
  selector: 'app-rnbo-device',
  templateUrl: './rnbo-device.component.html',
  styleUrls: ['./rnbo-device.component.css']
})
export class RnboDeviceComponent {
  //createUIElements = false;
  //style!: any;
  
  constructor(
      public rnboService: RnboService,
      public cdRef: ChangeDetectorRef,
      public audioService: AudioService      
      ) {
   }
  ngOnInit() {
    this.audioService.isRecordingBufferLoaded.subscribe((isLoaded: boolean) => {
      //console.log( `loading device: ${isLoaded}` );
      if(isLoaded) {
        this.rnboService.loadDevice({id: 'voiceFX_presets', folder: 'voice-fx'}).then(() => {
          this.cdRef.detectChanges();
        });
      }
    });
  }
}