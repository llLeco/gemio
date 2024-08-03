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
    path: 'asset-events/:id',
    loadChildren: () => import('./asset-events/asset-events.module').then( m => m.AssetEventsPageModule)
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
    path: 'asset-form',
    loadChildren: () => import('./asset-form/asset-form.module').then( m => m.AssetFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asset-form/:id',
    loadChildren: () => import('./asset-form/asset-form.module').then( m => m.AssetFormPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
