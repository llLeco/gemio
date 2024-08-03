import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetFormPage } from './asset-form.page';

const routes: Routes = [
  {
    path: '',
    component: AssetFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetFormPageRoutingModule {}
