import { Component, OnInit } from '@angular/core';
import { AssetService } from '../services/asset.service';
import { AuthService } from '../services/auth.service';
import { CollectionService } from '../services/collection.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.page.html',
  styleUrls: ['./collections.page.scss'],
})
export class CollectionsPage implements OnInit {

  collections: any = [];
  loading: boolean = true;

  constructor(
    private assetService: AssetService,
    private collectionService: CollectionService,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.loadCollections();
  }

  async loadCollections() {
    try {
      await this.errorHandler.showLoading('Loading collections...');
      this.collections = await this.collectionService.getCollections();
      console.log('Collections', this.collections);
      await this.errorHandler.hideLoading();
    } catch (error) {
      await this.errorHandler.hideLoading();
      this.errorHandler.handleError(error);
    }
  }

}
