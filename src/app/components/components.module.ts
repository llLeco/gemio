import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { EventItemComponent } from './event-item/event-item.component';
import { AssetSummaryCardComponent } from './asset-summary-card/asset-summary-card.component';

@NgModule({
  declarations: [
    EventItemComponent,
    AssetSummaryCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    EventItemComponent,
    AssetSummaryCardComponent,
  ]
})
export class ComponentsModule { }
