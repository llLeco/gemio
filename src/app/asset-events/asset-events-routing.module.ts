import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetEventsPage } from './asset-events.page';

const routes: Routes = [
  {
    path: '',
    component: AssetEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetEventsPageRoutingModule {}
