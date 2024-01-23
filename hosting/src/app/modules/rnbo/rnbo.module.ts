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
import { RnboGlobalInputComponent } from './rnbo-global-input/rnbo-global-input.component';
import { RnboMaterialParameterComponent } from './rnbo-material-parameter/rnbo-material-parameter.component';
import { RnboInportInputComponent } from './rnbo-inport-input/rnbo-inport-input.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { ParamIdInputComponent } from './param-id-input/param-id-input.component';
import { RnboDeviceSelectComponent } from './rnbo-device-select/rnbo-device-select.component';

@NgModule({
  declarations: [
    RnboDeviceComponent,
    RnboGlobalInputComponent,
    RnboMaterialParameterComponent,
    RnboInportInputComponent,
    TagInputComponent,
    ParamIdInputComponent,
    RnboDeviceSelectComponent
    
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
],
  exports: [
    RnboGlobalInputComponent,
    RnboInportInputComponent,
    RnboMaterialParameterComponent,
    RnboDeviceComponent,
    TagInputComponent

  ]
})
export class RnboModule { }
