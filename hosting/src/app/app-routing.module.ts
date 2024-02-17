import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'rubix', 
    loadChildren: () => import('./modules/rubix/rubix.module').then(m => m.RubixModule) 
  },
  {
    path: 'cycles', 
    loadChildren: () => import('./modules/cycles/cycles.module').then(m => m.CyclesModule) 
  },
  { 
    path: 'model-loader', 
    loadChildren: () => import('./modules/model-loader/model-loader.module').then(m => m.ModelLoaderModule) 
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: 'cycles', loadChildren: () => import('./modules/cycles/cycles.module').then(m => m.CyclesModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
