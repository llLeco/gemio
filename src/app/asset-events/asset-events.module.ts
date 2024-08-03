import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetEventsPageRoutingModule } from './asset-events-routing.module';

import { AssetEventsPage } from './asset-events.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssetEventsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AssetEventsPage]
})
export class AssetEventsPageModule {}
