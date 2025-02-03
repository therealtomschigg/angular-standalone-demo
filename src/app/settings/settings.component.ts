import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from "@angular/material/tabs";
import { SettingsGeneralComponent } from "../settings-general/settings-general.component";
import { SettingsKanzleiComponent } from "../settings-kanzlei/settings-kanzlei.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    SettingsGeneralComponent,
    SettingsKanzleiComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
