import { Component, OnInit } from '@angular/core';
import { AssetService } from '../services/asset.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  assets: any[] | undefined = [];
  loading: boolean = true;

  constructor(
    private assetService: AssetService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.loadAssets();
  }

  async loadAssets() {
    try {
      await this.errorHandler.showLoading('Loading assets...');
      this.assets = await this.assetService.getAllAssets().toPromise();
      await this.errorHandler.hideLoading();
    } catch (error) {
      await this.errorHandler.hideLoading();
      this.errorHandler.handleError(error);
    }
  }

  async doRefresh(event: any) {
    try {
      this.assets = await this.assetService.getAllAssets().toPromise();
      this.errorHandler.showToast('Assets refreshed successfully');
    } catch (error) {
      this.errorHandler.handleError(error);
    } finally {
      event.target.complete();
    }
  }
}
