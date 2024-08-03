import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private loading: any;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async handleError(error: any) {
    let errorMessage: string;

    if (error instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        errorMessage = 'No Internet Connection';
      } else {
        // Handle Http Error (error.status === 403, 404...)
        errorMessage = `${error.status} - ${error.message}`;
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      errorMessage = error.message ? error.message : error.toString();
    }

    await this.showErrorAlert(errorMessage);
  }

  async showToast(message: string, duration: number = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'bottom'
    });
    toast.present();
  }

  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showLoading(message: string = 'Please wait...') {
    this.loading = await this.loadingController.create({
      message: message
    });
    await this.loading.present();
  }

  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}
