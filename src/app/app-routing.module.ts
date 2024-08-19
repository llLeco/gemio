import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asset-form/:id',
    loadChildren: () => import('./asset-form/asset-form.module').then( m => m.AssetFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asset-form/:id',
    loadChildren: () => import('./asset-form/asset-form.module').then( m => m.AssetFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asset/:id',
    loadChildren: () => import('./asset-details/asset-details.module').then( m => m.AssetDetailsPageModule)
  },
  {
    path: 'collection-form',
    loadChildren: () => import('./collection-form/collection-form.module').then( m => m.CollectionFormPageModule)
  },
  {
    path: 'permissions',
    loadChildren: () => import('./permissions/permissions.module').then( m => m.PermissionsPageModule)
  },
  {
    path: 'collections',
    loadChildren: () => import('./collections/collections.module').then( m => m.CollectionsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
