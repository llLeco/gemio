import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    try {
      const result = await this.authService.login(this.username, this.password).toPromise();
      console.log('Login successful', result);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Login failed', error);
      this.showErrorAlert(error);
    }
  }

  async loginAs(role: 'creator' | 'owner' | 'maintainer') {
    try {

      switch (role) {
        case 'creator':
          this.username = 'creator';
          this.password = '1221';
          break;
        case 'owner':
          this.username = 'owner';
          this.password = '1221';
          break;
        case 'maintainer':
          this.username = 'maintainer';
          this.password = '1221';
          break;
      }


      const result = await this.authService.login(this.username, this.password).toPromise();
      console.log('Login successful', result);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Login failed', error);
      this.showErrorAlert(error);
    }
  }

  async showErrorAlert(error: any) {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: error.error?.message || 'An unexpected error occurred.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
