import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionFormPageRoutingModule } from './collection-form-routing.module';

import { CollectionFormPage } from './collection-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CollectionFormPage]
})
export class CollectionFormPageModule {}
