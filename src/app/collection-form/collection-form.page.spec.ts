import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectionFormPage } from './collection-form.page';

describe('CollectionFormPage', () => {
  let component: CollectionFormPage;
  let fixture: ComponentFixture<CollectionFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
