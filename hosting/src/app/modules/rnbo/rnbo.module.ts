import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnboDeviceComponent } from './rnbo-device/rnbo-device.component';

import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSliderModule} from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { RnboMaterialParameterComponent } from './rnbo-material-parameter/rnbo-material-parameter.component';
import { RnboInportInputComponent } from './inports/rnbo-inport-input/rnbo-inport-input.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { RnboDeviceSelectComponent } from './rnbo-device-select/rnbo-device-select.component';
import { RnboKeyboardComponent } from './rnbo-keyboard/rnbo-keyboard.component';
import { PortTagSelectComponent } from './inports/port-tag-select/port-tag-select.component';
import { PortMessageTextInputComponent } from './inports/port-message-text-input/port-message-text-input.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    RnboDeviceComponent,
    RnboMaterialParameterComponent,
    RnboInportInputComponent,
    TagInputComponent,
    RnboDeviceSelectComponent,
    RnboKeyboardComponent,
    PortTagSelectComponent,
    PortMessageTextInputComponent
    
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatSlideToggleModule
],
  exports: [
    RnboInportInputComponent,
    RnboMaterialParameterComponent,
    RnboDeviceComponent,
    TagInputComponent,
    RnboKeyboardComponent

  ]
})
export class RnboModule { }
