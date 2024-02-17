import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CyclesRoutingModule } from './cycles-routing.module';
import { CyclesComponent } from './cycles.component';


@NgModule({
  declarations: [
    CyclesComponent
  ],
  imports: [
    CommonModule,
    CyclesRoutingModule
  ]
})
export class CyclesModule { }
