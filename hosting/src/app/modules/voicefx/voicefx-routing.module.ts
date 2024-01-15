import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoicefxComponent } from './voicefx.component';

const routes: Routes = [{ path: '', component: VoicefxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoicefxRoutingModule { }
