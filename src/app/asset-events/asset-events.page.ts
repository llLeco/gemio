import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../services/asset.service';

@Component({
  selector: 'app-asset-events',
  templateUrl: './asset-events.page.html',
  styleUrls: ['./asset-events.page.scss'],
})
export class AssetEventsPage implements OnInit {
  assetId: any;
  events: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private assetService: AssetService
  ) { }

  ngOnInit() {
    this.assetId = this.route.snapshot.paramMap.get('id');
    this.loadEvents();
  }

  loadEvents(event?: any) {
    this.assetService.getAssetEvents(this.assetId).subscribe(
      (events) => {
        this.events = events;
        if (event) {
          event.target.complete();
        }
      },
      (error) => {
        console.error('Error fetching events:', error);
        if (event) {
          event.target.complete();
        }
      }
    );
  }

  doRefresh(event: any) {
    this.loadEvents(event);
  }
}
