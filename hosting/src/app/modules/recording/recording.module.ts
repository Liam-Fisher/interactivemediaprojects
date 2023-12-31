import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecordButtonComponent } from './record-button/record-button.component';
import { PlayButtonComponent } from './play-button/play-button.component';
import { MediaUiComponent } from './media-ui/media-ui.component';
import { TextInputComponent } from './text-input/text-input.component';
import { LanguageInputComponent } from './language-input/language-input.component';
import { RecordingModeSelectComponent } from './recording-mode-select/recording-mode-select.component';



@NgModule({
  declarations: [
    RecordButtonComponent,
    PlayButtonComponent,
    MediaUiComponent,
    TextInputComponent,
    LanguageInputComponent,
    RecordingModeSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  /*   RecordButtonComponent,
    PlayButtonComponent
   */
    MediaUiComponent,
    TextInputComponent,
    LanguageInputComponent
  ]
})
export class RecordingModule { 


  
}
