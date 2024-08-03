import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetEventsPage } from './asset-events.page';

describe('AssetEventsPage', () => {
  let component: AssetEventsPage;
  let fixture: ComponentFixture<AssetEventsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
