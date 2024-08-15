import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.page.html',
  styleUrls: ['./user-permissions.page.scss'],
})
export class UserPermissionsPage implements OnInit {
  @Input() public permission: any;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  apiKey: string = 'your-api-key-here';
  isContentVisible: boolean = false;

  toggleContentVisibility() {
    this.isContentVisible = !this.isContentVisible;
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
