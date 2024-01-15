import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RubixRoutingModule } from './rubix-routing.module';
import { RubixComponent } from './rubix.component';


@NgModule({
  declarations: [
    RubixComponent,
  ],
  imports: [
    CommonModule,
    RubixRoutingModule
  ]
})
export class RubixModule { }
