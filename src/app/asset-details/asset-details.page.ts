import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { LoadingController } from '@ionic/angular';
import { CollectionService } from '../services/collection.service';
import { HederaService } from '../services/hedera.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler.service';

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
  public collection: any;

  constructor(
    private route: ActivatedRoute,
    private assetService: AssetService,
    private loadingController: LoadingController,
    private collectionService: CollectionService,
    private hederaService: HederaService,
    private errorHandler: ErrorHandlerService,
  ) { }

  async ngOnInit() {
    this.collectionId = this.route.snapshot.paramMap.get('id');
    if (this.collectionId) {
      await this.getCollectionInfo(this.collectionId);
      await this.loadCollectionAssets(this.collectionId);
    }
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  async getCollectionInfo(collectionId: string) {
    try {
      await this.errorHandler.showLoading('Loading collections...');
      this.collection = await this.collectionService.getCollection(collectionId);
      console.log('Collection:', this.collection);
      await this.errorHandler.hideLoading();
    } catch (error) {
      await this.errorHandler.hideLoading();
      this.errorHandler.handleError(error);
    }
  }

  async loadCollectionAssets(id: string) {
    try {
      const assets = await this.collectionService.getCollectionAssets(id);
      this.assets = await Promise.all(
        assets.map(async (asset) => {
          const details = await this.assetService.getAssetDetails(asset.metadata);
          let messages: any = [];
          try {
            messages = await this.hederaService.getMessages(details.topicId, new Date(0)).toPromise();
            messages.sort((a:any, b:any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            console.log('Messages:', messages);
          } catch (error) {
            console.warn(`Failed to fetch messages for asset ${asset.id}, but continuing`, error);
          }
          return { ...asset, details, events: messages };
        })
      );
    } catch (error) {
      this.error = 'Failed to load asset details';
      console.error('Error loading asset details:', error);
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

  openOnHashscan(asset: any) {
    window.open(`https://hashscan.io/testnet/token/${asset.id}/${asset.serialNumber}`, '_blank');
  }
}
