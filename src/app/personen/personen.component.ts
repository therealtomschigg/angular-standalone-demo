// src/app/personen.component.ts
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PersonDetailDialogComponent } from '../person-detail-dialog/person-detail-dialog.component';
import { PersonAddDialogComponent } from '../person-add-dialog/person-add-dialog.component';


// Definiere ein Interface für Personen
export interface Person {
  datum: string;
  vorname: string;
  nachname: string;
  status: string;
}

// Beispielhafte Daten – in der Praxis werden diese vermutlich von einem Backend geladen
const PERSON_DATA: Person[] = [
  { datum: '2025-01-01', vorname: 'Max',   nachname: 'Mustermann',  status: 'Aktiv' },
  { datum: '2025-01-02', vorname: 'Erika', nachname: 'Musterfrau',  status: 'Inaktiv' },
  { datum: '2025-01-03', vorname: 'John',  nachname: 'Doe',         status: 'Aktiv' },
  { datum: '2025-01-04', vorname: 'Jane',  nachname: 'Doe',         status: 'Aktiv' },
  // … weitere Datensätze
];

@Component({
  selector: 'app-personen',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatDialogModule
  ],
  template: `
    <!-- Kopfbereich: Suchfeld und "Person anlegen"-Button -->
    <div style="display: flex; margin-bottom: 16px; height: 56px;">
      <button mat-raised-button color="primary" (click)="addPerson()" style="height: 100%;">
        <mat-icon>person_add</mat-icon>
        Person anlegen
      </button>
      <mat-form-field appearance="outline" style="flex: 1; margin-left: 16px; height: 100%;">
        <mat-label>Suche</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Nach Vor- oder Nachname suchen">
      </mat-form-field>
    </div>
    
    <!-- Tabelle -->
    <div class="table-container">
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" style="width: 100%;">
        
        <!-- Neue Spalte: Detail-Button -->
        <ng-container matColumnDef="detail">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element">
            <button mat-mini-fab color="accent" (click)="openDetail(element); $event.stopPropagation()">
              <mat-icon>info</mat-icon>
            </button>
          </td>
        </ng-container>

        <!-- Datum-Spalte -->
        <ng-container matColumnDef="datum">
          <th mat-header-cell *matHeaderCellDef> Datum </th>
          <td mat-cell *matCellDef="let element"> {{ element.datum }} </td>
        </ng-container>
        
        <!-- Name-Spalte (Vor- & Nachname) -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Vor- & Nachname </th>
          <td mat-cell *matCellDef="let element"> {{ element.vorname }} {{ element.nachname }} </td>
        </ng-container>
        
        <!-- Status-Spalte -->
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let element"> {{ element.status }} </td>
        </ng-container>
        
        <!-- Header- und Datenreihen -->
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>

    <!-- Paginator -->
    <div style="display: flex; justify-content: flex-start; margin-top: 16px;">
      <mat-paginator [pageSize]="10" [pageSizeOptions]="[10, 20, 30, 50]" showFirstLastButtons></mat-paginator>
    </div>
  `,
  styles: [`
    .table-container {
      max-height: 60vh;
      overflow-y: auto;
    }
    /* Optional: Hover-Effekt für die Zeile */
    .mat-mdc-row:hover {
      background-color: #f5f5f5;
    }
  `]
})
export class PersonenComponent implements AfterViewInit {
  // Aktualisierte Spalten: 'detail' als erste Spalte, gefolgt von 'datum', 'name' und 'status'
  displayedColumns: string[] = ['detail', 'datum', 'name', 'status'];
  dataSource = new MatTableDataSource<Person>(PERSON_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {
    // Filter-Predicate so konfigurieren, dass Vorname und Nachname durchsucht werden:
    this.dataSource.filterPredicate = (data: Person, filter: string) => {
      const searchStr = (data.vorname + ' ' + data.nachname).toLowerCase();
      return searchStr.indexOf(filter) !== -1;
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  addPerson() {
    this.dialog.open(PersonAddDialogComponent, {
      width: '500px',  // oder eine andere Breite, die dir gefällt
      height: 'auto'   // Höhe passt sich dem Inhalt an
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('Neue Person:', result);
        // Hier könntest du die neue Person zu deiner Datenquelle hinzufügen
      }
    });
  }

  openDetail(person: Person) {
    this.dialog.open(PersonDetailDialogComponent, {
      data: person,
      //width: '80vw',   // 80% der Viewport-Breite
      height: '80vh',   // 80% der Viewport-Höhe
      minWidth: '800px'
    });
  }
  
}
