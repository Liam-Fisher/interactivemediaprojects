import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelLoaderRoutingModule } from './model-loader-routing.module';
import { ModelLoaderComponent } from './model-loader.component';


@NgModule({
  declarations: [
    ModelLoaderComponent
  ],
  imports: [
    CommonModule,
    ModelLoaderRoutingModule
  ]
})
export class ModelLoaderModule { }
