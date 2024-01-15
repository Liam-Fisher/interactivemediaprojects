import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoicefxRoutingModule } from './voicefx-routing.module';
import { VoicefxComponent } from './voicefx.component';


@NgModule({
  declarations: [
    VoicefxComponent
  ],
  imports: [
    CommonModule,
    VoicefxRoutingModule
  ]
})
export class VoicefxModule { }
