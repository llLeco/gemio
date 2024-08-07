import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { LoadingController } from '@ionic/angular';
import { CollectionService } from '../services/collection.service';
import { HederaService } from '../services/hedera.service';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.page.html',
  styleUrls: ['./asset-details.page.scss'],
})
export class AssetDetailsPage implements OnInit, OnDestroy {
  public assets: any[] = [];
  public collectionId: string | null = null;
  error: string | null = null;
  public newEvent: string = '';
  private messageSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private assetService: AssetService,
    private loadingController: LoadingController,
    private collectionService: CollectionService,
    private hederaService: HederaService
  ) { }

  async ngOnInit() {
    this.collectionId = this.route.snapshot.paramMap.get('id');
    if (this.collectionId) {
      await this.loadCollectionAssets(this.collectionId);
    }
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  async loadCollectionAssets(id: string) {
    const loading = await this.loadingController.create({
      message: 'Loading asset details...',
    });
    await loading.present();

    try {
      const assets = await this.collectionService.getCollectionAssets(id);
      console.log('Assets:', assets);

      this.assets = await Promise.all(
        assets.map(async (asset) => {
          const details = await this.assetService.getAssetDetails(asset.metadata);
          console.log('Details:', details);

          const messages = await this.hederaService.getMessages(details.topicId, new Date(0)).toPromise();
          console.log('Messages:', messages);

          const assetWithDetails = {
            ...asset,
            details,
            events: messages
          };

          return assetWithDetails;
        })
      );

      console.log('Assets:', this.assets);
    } catch (error) {
      this.error = 'Failed to load asset details';
      console.error('Error loading asset details:', error);
    } finally {
      await loading.dismiss();
    }
  }

  async publishEvent(asset: any) {
    try {
      console.log('Publishing event:', this.newEvent);
      console.log('Asset:', asset);
      await this.assetService.postAssetEvent(asset.details.topicId, this.newEvent);
      this.newEvent = '';
      asset.events.push(this.newEvent);
    } catch (error) {
      console.error('Error publishing event:', error);
    }
  }
}
