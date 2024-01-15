import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RubixComponent } from './rubix.component';

const routes: Routes = [{ path: '', component: RubixComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RubixRoutingModule { }
