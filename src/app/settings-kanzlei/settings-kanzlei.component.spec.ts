import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsKanzleiComponent } from './settings-kanzlei.component';

describe('SettingsKanzleiComponent', () => {
  let component: SettingsKanzleiComponent;
  let fixture: ComponentFixture<SettingsKanzleiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsKanzleiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsKanzleiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
