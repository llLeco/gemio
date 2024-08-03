import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetService } from '../services/asset.service';
import { ToastController } from '@ionic/angular';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset-form.page.html',
  styleUrls: ['./asset-form.page.scss'],
})
export class AssetFormPage implements OnInit {
  assetForm: FormGroup = new FormGroup({});
  isEditMode = false;
  assetId: any;

  constructor(
    private formBuilder: FormBuilder,
    private assetService: AssetService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private errorHandler: ErrorHandlerService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.assetId = this.route.snapshot.paramMap.get('id');
    if (this.assetId) {
      this.isEditMode = true;
      this.loadAssetData();
    }
  }

  createForm() {
    this.assetForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      manufactureDate: ['', Validators.required],
      lastMaintenanceDate: [''],
      nextMaintenanceDate: [''],
      status: ['operational', Validators.required],
      location: this.formBuilder.group({
        latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
        longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      }),
      specifications: this.formBuilder.group({}),
      currentPerformance: this.formBuilder.group({}),
    });
  }

  async loadAssetData() {
    try {
      await this.errorHandler.showLoading('Loading asset data...');
      const asset = await this.assetService.getAssetById(this.assetId).toPromise();
      this.assetForm.patchValue(asset);
      await this.errorHandler.hideLoading();
    } catch (error) {
      await this.errorHandler.hideLoading();
      this.errorHandler.handleError(error);
    }
  }

  async onSubmit() {
    if (this.assetForm.valid) {
      const assetData = this.assetForm.value;
      try {
        await this.errorHandler.showLoading(this.isEditMode ? 'Updating asset...' : 'Creating asset...');
        if (this.isEditMode) {
          await this.assetService.updateAsset(this.assetId, assetData).toPromise();
          this.errorHandler.showToast('Asset updated successfully');
        } else {
          await this.assetService.createAsset(assetData).toPromise();
          this.errorHandler.showToast('Asset created successfully');
        }
        await this.errorHandler.hideLoading();
        this.router.navigate(['/dashboard']);
      } catch (error) {
        await this.errorHandler.hideLoading();
        this.errorHandler.handleError(error);
      }
    } else {
      this.errorHandler.showToast('Please fill all required fields');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
