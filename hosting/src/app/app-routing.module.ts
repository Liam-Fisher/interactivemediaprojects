import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'rubix', loadChildren: () => import('./modules/rubix/rubix.module').then(m => m.RubixModule) }, { path: 'voicefx', loadChildren: () => import('./modules/voicefx/voicefx.module').then(m => m.VoicefxModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
