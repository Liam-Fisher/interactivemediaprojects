import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelLoaderComponent } from './model-loader.component';

const routes: Routes = [{ path: '', component: ModelLoaderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelLoaderRoutingModule { }
