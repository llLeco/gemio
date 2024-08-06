import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CollectionService } from 'src/app/services/collection.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.page.html',
  styleUrls: ['./collection-form.page.scss'],
})
export class CollectionFormPage implements OnInit {
  collectionForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private collectionService: CollectionService
  ) {
    this.createForm();
  }

  ngOnInit() { }

  createForm() {
    this.collectionForm = this.formBuilder.group({
      name: ['', Validators.required],
      symbol: ['', Validators.required],
      description: [''],
    });
  }

  async onSubmit() {
    if (this.collectionForm.valid) {
      const assetData = this.collectionForm.value;

      try {
        await this.errorHandler.showLoading('Creating Collection...');

        await this.collectionService.createCollection(assetData);
        this.errorHandler.showToast('Collection created successfully');

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

}
