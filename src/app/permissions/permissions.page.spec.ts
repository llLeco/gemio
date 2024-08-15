import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermissionsPage } from './permissions.page';

describe('PermissionsPage', () => {
  let component: PermissionsPage;
  let fixture: ComponentFixture<PermissionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
