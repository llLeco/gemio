import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetDetailsPage } from './asset-details.page';

const routes: Routes = [
  {
    path: '',
    component: AssetDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetDetailsPageRoutingModule {}
