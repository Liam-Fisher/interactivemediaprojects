import { Component, ElementRef, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RnboService } from 'src/app/services/rnbo/rnbo.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html', 
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent {
  textData!: FormControl<string|null>;
  language: string = navigator.language;
  @ViewChild('languageMenu', { static: false }) languageInput!: ElementRef<HTMLSelectElement>;

  /* ttsForm!: FormGroup<{
    textInput: FormControl<string|null>,
    language: FormControl<string|null>
  }>;   */
  constructor(private rnboService: RnboService, private textToSpeechService: TextToSpeechService/* , private fb: FormBuilder */) { }
  ngOnInit() {
    //console.log(navigator.language);
    this.textData = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(64)
    ]);
  }
  get text() {
    return this.textData.getRawValue();
  }
  onSubmit() {
    this.rnboService.loadingBuffer.next(true);
    this.textToSpeechService.speak(this.text,  this.language).then((filename: string) => {
      this.rnboService.audioForFile(filename);
    }); 
  }
}
