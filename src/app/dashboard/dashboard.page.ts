import { Component, OnInit } from '@angular/core';
import { AssetService } from '../services/asset.service';
import { CollectionService } from '../services/collection.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  assets: any[] = [];
  collections: any = [];
  username: string = '';
  hederaAccountId: string = '';
  loading: boolean = true;

  constructor(
    private assetService: AssetService,
    private collectionService: CollectionService,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadUserInfo();
    // this.loadCollections();
  }

  async loadUserInfo() {
    const userInfo = await this.authService.getUserInfo();
    console.log('User info', userInfo);
    this.username = userInfo.username;
    this.hederaAccountId = userInfo.hederaAccountId;
  }

  // async loadCollections() {
  //   try {
  //     await this.errorHandler.showLoading('Loading collections...');
  //     this.collections = await this.collectionService.getCollections();
  //     console.log('Collections', this.collections);
  //     await this.errorHandler.hideLoading();
  //   } catch (error) {
  //     await this.errorHandler.hideLoading();
  //     this.errorHandler.handleError(error);
  //   }
  // }

  async doRefresh(event: any) {
    try {
      this.collections = await this.collectionService.getCollections();
      this.errorHandler.showToast('Collections refreshed successfully');
    } catch (error) {
      this.errorHandler.handleError(error);
    } finally {
      event.target.complete();
    }
  }
}
