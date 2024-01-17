import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RubixRoutingModule } from './rubix-routing.module';
import { RubixComponent } from './rubix.component';
import { RubixRnboComponent } from './rubix-rnbo/rubix-rnbo.component';
import { RubixDisplayComponent } from './rubix-display/rubix-display.component';


@NgModule({
  declarations: [
    RubixComponent,
    RubixRnboComponent,
    RubixDisplayComponent,
  ],
  imports: [
    CommonModule,
    RubixRoutingModule
  ]
})
export class RubixModule { }
