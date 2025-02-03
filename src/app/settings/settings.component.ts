import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from "@angular/material/tabs";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatTabsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{
  catImageId: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCatId();
  }

  loadCatId() {
    this.http.get<any[]>('https://api.thecatapi.com/v1/images/search').subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.catImageId = data[0].id; // Statt URL die ID speichern
        }
      },
      error: (err) => console.error('Fehler beim Laden der Cat-ID:', err)
    });
  }

}
