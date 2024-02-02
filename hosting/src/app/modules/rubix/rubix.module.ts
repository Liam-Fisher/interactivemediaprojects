import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RubixRoutingModule } from './rubix-routing.module';
import { RubixComponent } from './rubix.component';
import { RubixRnboComponent } from './rubix-rnbo/rubix-rnbo.component';
import { RubixDisplayComponent } from './rubix-display/rubix-display.component';
import { RubixRotationInputComponent } from './rubix-rotation-input/rubix-rotation-input.component';
import { MatButtonModule } from '@angular/material/button';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    RubixComponent,
    RubixRnboComponent,
    RubixDisplayComponent,
    RubixRotationInputComponent,
  ],
  imports: [
    CommonModule,
    RubixRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class RubixModule { }
