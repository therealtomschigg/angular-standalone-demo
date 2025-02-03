import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { HttpClient } from "@angular/common/http";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-settings-general',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinner
  ],
  templateUrl: './settings-general.component.html',
  styleUrl: './settings-general.component.scss'
})
export class SettingsGeneralComponent {
  catImageId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCatId();
  }

  loadCatId() {
    this.http.get<any[]>('https://api.thecatapi.com/v1/images/search').subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.catImageId = data[0].id;
        }
      },
      error: (err) => console.error('Fehler beim Laden der Cat-ID:', err)
    });
  }
}
