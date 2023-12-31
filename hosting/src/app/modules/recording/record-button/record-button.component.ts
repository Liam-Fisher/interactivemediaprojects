import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';
import { AudioService } from 'src/app/services/webAudio/audio.service';

@Component({
  selector: 'app-record-button',
  templateUrl: './record-button.component.html',
  styleUrls: ['./record-button.component.scss']
})
export class RecordButtonComponent {
  @Input() size: number = 100;
  recordingTimeout: any = null;
  maxRecordingTime = 5000;
  pointerDown = new BehaviorSubject(false);
  isAudioFileUploadActive = new BehaviorSubject(false);
  isRecording = new BehaviorSubject(false);
  isPlaying = new BehaviorSubject(false);
  mediaRecorder: MediaRecorder | null = null;
  audioChunks: Blob[] = [];
  recordedAudio: Blob | null = null;

  @ViewChild('recordButton') recordButton!: ElementRef;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  @Output() recordedURL = new EventEmitter<string>();
  constructor(
    public audioService: AudioService,
    public rnboService: RnboService,  
    private cdRef: ChangeDetectorRef
  ) {}
  ngAfterViewInit() {
    //console.log(`rendering`);
    //this.render();
  }
 
  tesst() {
    this.audioService.setupContext();
    this.audioService.testSound();
  }
  handleRecordClick(evt: any) {
    //console.log(`record button clicked`, evt);
    if (this.isRecording.value) {
      this.mediaRecorder?.stop();
    } else {
    this.audioService.testSound();
    this.isRecording.next(true);
    this.cdRef.detectChanges();
    this.recordAudioInput();
    }
  } 
   async stoppedRecording() {
    this.isRecording.next(false);
    clearTimeout(this.recordingTimeout);
    this.recordingTimeout = null;
    //console.log(`created blob`);
    this.recordedAudio = new Blob(this.audioChunks, {
      type: 'audio/wav',
    });
    this.audioChunks = [];
    this.cdRef.detectChanges();
    await this.audioService.encodeBlob(this.recordedAudio);
  }
recordAudioInput() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.onstart = () => {
          this.recordingTimeout = setTimeout(() => {
            this.mediaRecorder?.stop();
          }, this.maxRecordingTime);
        };

        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            this.audioChunks.push(e.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          //console.log('recording stopped');
          this.stoppedRecording();
        };

        this.mediaRecorder.start();
        //console.log(`recording for up too ${this.maxRecordingTime}ms`);

      })
      .catch((error) => {
        console.error('Error accessing the microphone:', error);
        this.isRecording.next(false);
      });
  }

}
