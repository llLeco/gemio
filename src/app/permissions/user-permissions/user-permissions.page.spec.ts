import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPermissionsPage } from './user-permissions.page';

describe('UserPermissionsPage', () => {
  let component: UserPermissionsPage;
  let fixture: ComponentFixture<UserPermissionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermissionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
