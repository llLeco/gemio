import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-asset-summary-card',
  templateUrl: './asset-summary-card.component.html',
  styleUrls: ['./asset-summary-card.component.scss'],
})
export class AssetSummaryCardComponent {
  @Input() asset: any;
}
