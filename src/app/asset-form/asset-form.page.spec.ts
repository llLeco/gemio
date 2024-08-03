import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetFormPage } from './asset-form.page';

describe('AssetFormPage', () => {
  let component: AssetFormPage;
  let fixture: ComponentFixture<AssetFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
