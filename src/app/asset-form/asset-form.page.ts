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
  public collectionId: string | null = null;

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

  async ngOnInit() {
    this.collectionId = this.route.snapshot.paramMap.get('id');
  }

  createForm() {
    this.assetForm = this.formBuilder.group({
      name: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      manufactureDate: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.assetForm.valid) {
      const assetData = this.assetForm.value;
      assetData.collectionId = this.collectionId;

      try {
        await this.errorHandler.showLoading('Creating asset...');

        await this.assetService.createAsset(assetData);
        this.errorHandler.showToast('Asset created successfully');

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
