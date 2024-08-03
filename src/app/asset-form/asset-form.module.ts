import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetFormPageRoutingModule } from './asset-form-routing.module';

import { AssetFormPage } from './asset-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AssetFormPage]
})
export class AssetFormPageModule {}
