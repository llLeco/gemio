import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserPermissionsPage } from './user-permissions/user-permissions.page';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})
export class PermissionsPage implements OnInit {

  public permissions = [
    {
      id: '0.0.123456',
      username: 'Technica',
      role: 'Maintainer',
      expiration: '12/31/2024',
      status: 'Active',
      color: 'success',
      assets: [
        {
          id: '0.0.123456.1',
          name: 'Asset 1',
        },
        {
          id: '0.0.123456.2',
          name: 'Asset 2',
        },
        {
          id: '0.0.123456.3',
          name: 'Asset 3',
        }
      ]
    },
    {
      id: '0.0.123457',
      username: 'Fixit',
      role: 'Maintainer',
      expiration: '12/31/2023',
      status: 'Expired',
      color: 'danger',
      assets: [
        {
          id: '0.0.123456.1',
          name: 'Asset 1',
        },
        {
          id: '0.0.123456.2',
          name: 'Asset 2',
        },
      ]
    },
    {
      id: '0.0.123459',
      username: 'Repairman',
      role: 'Maintainer',
      expiration: '12/31/2024',
      status: 'Revoked',
      color: 'warning',
      assets: [
        {
          id: '0.0.123456.1',
          name: 'Asset 1',
        },
        {
          id: '0.0.123456.2',
          name: 'Asset 2',
        },
        {
          id: '0.0.123456.3',
          name: 'Asset 3',
        }
      ]
    }
  ];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async openUserPermissions(permission: any) {
    const modal = await this.modalController.create({
      component: UserPermissionsPage,
      componentProps: {
        permission: permission
      }
    });
    return await modal.present();

  }

}
