import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NexusKeyboardComponent } from './nexus-keyboard/nexus-keyboard.component';
import { NexusDialArrayComponent } from './nexus-dial-array/nexus-dial-array.component';
import { NexusDialMatrixComponent } from './nexus-dial-matrix/nexus-dial-matrix.component';
import { NexusSliderArrayComponent } from './nexus-slider-array/nexus-slider-array.component';
import { NexusTransportComponent } from './nexus-transport/nexus-transport.component';
import { RnboTransportStateComponent } from './nexus-transport/rnbo-transport-state/rnbo-transport-state.component';



@NgModule({
  declarations: [
    NexusKeyboardComponent,
    NexusDialArrayComponent,
    NexusDialMatrixComponent,
    NexusSliderArrayComponent,
    NexusTransportComponent,
    RnboTransportStateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NexusUiModule { }
