// src/app/person-add-dialog.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <h2 mat-dialog-title>Neue Person anlegen</h2>
    <mat-dialog-content [formGroup]="addPersonForm" style="display: flex; flex-direction: column; gap: 16px; padding: 8px;">
      <!-- Vorname -->
      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Vorname</mat-label>
        <input matInput formControlName="vorname" placeholder="Vorname">
      </mat-form-field>
      
      <!-- Nachname -->
      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Nachname</mat-label>
        <input matInput formControlName="nachname" placeholder="Nachname">
      </mat-form-field>
      
      <!-- Slide Toggle: E-Mail an Person senden -->
      <mat-slide-toggle formControlName="sendEmail">
        E-Mail an Person senden
      </mat-slide-toggle>
      
      <!-- E-Mail Inputfeld (nur sichtbar, wenn sendEmail aktiv ist) -->
      <div *ngIf="addPersonForm.get('sendEmail')?.value">
        <mat-form-field appearance="outline" style="width: 100%;">
          <mat-label>E-Mail</mat-label>
          <input matInput formControlName="email" placeholder="E-Mail" type="email">
        </mat-form-field>
      </div>
      
      <!-- Dropdown: Dokumenttyp -->
      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Dokumenttyp</mat-label>
        <mat-select formControlName="dokumenttyp">
          <mat-option value="Alle Dokumente">Alle Dokumente</mat-option>
          <mat-option value="Benutzerdefiniert">Benutzerdefiniert</mat-option>
        </mat-select>
      </mat-form-field>
      
      <!-- Checkbox-Bereich: nur anzeigen, wenn "Benutzerdefiniert" ausgewählt ist -->
      <div *ngIf="addPersonForm.get('dokumenttyp')?.value === 'Benutzerdefiniert'" formGroupName="benutzerdefiniertDokumente" style="display: flex; flex-direction: column; gap: 8px; margin-left: 16px;">
        <mat-checkbox formControlName="vollmacht">Vollmacht</mat-checkbox>
        <mat-checkbox formControlName="mandantenbogen">Mandantenbogen</mat-checkbox>
        <mat-checkbox formControlName="mandatsvertrag">Mandatsvertrag</mat-checkbox>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end" style="padding: 8px;">
      <button mat-button (click)="onCancel()">Abbrechen</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="addPersonForm.invalid">
        <mat-icon>check</mat-icon>
        Hinzufügen
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 300px; /* Mindestbreite des Dialogs */
      min-height: 600px;
    }
  `]
})
export class PersonAddDialogComponent {
  addPersonForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PersonAddDialogComponent>
  ) {
    this.addPersonForm = this.fb.group({
      vorname: ['', Validators.required],
      nachname: ['', Validators.required],
      // Toggle-Steuerung für E-Mail: Standardmäßig false, sodass das E-Mail-Feld nicht angezeigt wird
      sendEmail: [false],
      email: [''], // E-Mail-Feld (optional, wird nur benötigt, wenn sendEmail true ist)
      dokumenttyp: ['', Validators.required],
      // Verschachtelte Gruppe für Checkboxen (für den Fall "Benutzerdefiniert")
      benutzerdefiniertDokumente: this.fb.group({
        vollmacht: [false],
        mandantenbogen: [false],
        mandatsvertrag: [false]
      })
    });
  }

  onSubmit() {
    if (this.addPersonForm.valid) {
      console.log('Neue Person:', this.addPersonForm.value);
      this.dialogRef.close(this.addPersonForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
