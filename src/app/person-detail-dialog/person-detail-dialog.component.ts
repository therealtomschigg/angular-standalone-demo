// src/app/person-detail-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface Person {
  datum: string;
  vorname: string;
  nachname: string;
  status: string;
}

@Component({
  selector: 'app-person-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>Personendetails</h2>
    <mat-dialog-content>
      <!-- Tabelle mit Personendaten -->
      <table class="person-details">
        <tr>
          <th>Vorname</th>
          <td>{{ data.vorname }}</td>
        </tr>
        <tr>
          <th>Nachname</th>
          <td>{{ data.nachname }}</td>
        </tr>
        <tr>
          <th>Datum</th>
          <td>{{ data.datum }}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{{ data.status }}</td>
        </tr>
        <tr>
          <th>URL</th>
          <td>{{ data.status }}</td>
        </tr>
      </table>
      
      <!-- Überschrift für den Kachelbereich -->
      <p>Dokumente</p>
      
      <!-- Grid-Bereich mit 4 Kacheln -->
      <div class="tile-grid">
        <div class="tile">
          <div class="tile-icon">
            <mat-icon>description</mat-icon>
          </div>
          <div class="tile-text">Vollmacht</div>
        </div>
        <div class="tile">
          <div class="tile-icon">
            <mat-icon>folder</mat-icon>
          </div>
          <div class="tile-text">Mandantenbogen</div>
        </div>
        <div class="tile">
          <div class="tile-icon">
            <mat-icon>assignment</mat-icon>
          </div>
          <div class="tile-text">Mandatsvertrag</div>
        </div>
        <div class="tile">
          <div class="tile-icon">
            <mat-icon>insert_drive_file</mat-icon>
          </div>
          <div class="tile-text">Sonstiges</div>
        </div>
      </div>

      <p>Aktivitäten</p>
      <div>
        Test
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Schließen</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 300px;
    }
    table.person-details {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
    }
    table.person-details th,
    table.person-details td {
      padding: 8px;
      border: 1px solid #ddd;
      text-align: left;
    }
    table.person-details th {
      background-color: #f5f5f5;
    }
    .tile-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-top: 16px;
    }
    .tile {
      background-color: #fff;
      border-radius: 4px;
      padding: 16px;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;
      position: relative;
    }
    .tile:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
    .tile-icon {
      font-size: 48px;
      opacity: 0.3;
      margin-bottom: 8px;
    }
    .tile-text {
      font-size: 16px;
      font-weight: 500;
    }
  `]
})
export class PersonDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Person) { }
}
