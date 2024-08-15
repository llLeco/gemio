import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionsPage } from './permissions.page';

const routes: Routes = [
  {
    path: '',
    component: PermissionsPage
  },
  {
    path: 'user-permissions',
    loadChildren: () => import('./user-permissions/user-permissions.module').then( m => m.UserPermissionsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionsPageRoutingModule {}
