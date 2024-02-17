import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CyclesComponent } from './cycles.component';

const routes: Routes = [{ path: '', component: CyclesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CyclesRoutingModule { }
