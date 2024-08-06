import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetDetailsPage } from './asset-details.page';

describe('AssetDetailsPage', () => {
  let component: AssetDetailsPage;
  let fixture: ComponentFixture<AssetDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
