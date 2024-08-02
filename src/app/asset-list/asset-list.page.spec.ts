import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetListPage } from './asset-list.page';

describe('AssetListPage', () => {
  let component: AssetListPage;
  let fixture: ComponentFixture<AssetListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
