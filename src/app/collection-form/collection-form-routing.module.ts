import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionFormPage } from './collection-form.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionFormPageRoutingModule {}
