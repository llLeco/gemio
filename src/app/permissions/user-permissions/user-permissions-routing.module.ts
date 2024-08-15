import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPermissionsPage } from './user-permissions.page';

const routes: Routes = [
  {
    path: '',
    component: UserPermissionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPermissionsPageRoutingModule {}
