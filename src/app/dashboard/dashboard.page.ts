import { Component, OnInit } from '@angular/core';
import { AssetService } from '../services/asset.service';
import { CollectionService } from '../services/collection.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserInfo();
  }

  async loadUserInfo() {
    const userInfo = await this.authService.getUserInfo();
    console.log('User info', userInfo);
    this.username = userInfo.username;
    this.hederaAccountId = userInfo.hederaAccountId;
  }

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

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
