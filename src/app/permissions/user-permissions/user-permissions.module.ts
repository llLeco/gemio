import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPermissionsPageRoutingModule } from './user-permissions-routing.module';

import { UserPermissionsPage } from './user-permissions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPermissionsPageRoutingModule
  ],
  declarations: [UserPermissionsPage]
})
export class UserPermissionsPageModule {}
