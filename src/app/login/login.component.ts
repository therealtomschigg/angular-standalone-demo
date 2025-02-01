// src/app/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import hinzufügen
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div style="display: flex; justify-content: center; margin-top: 50px;">
      <mat-card style="width: 400px;">
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill" style="width: 100%;">
              <mat-label>Benutzername</mat-label>
              <input matInput placeholder="Benutzername" formControlName="username">
            </mat-form-field>
            <mat-form-field appearance="fill" style="width: 100%;">
              <mat-label>Passwort</mat-label>
              <input matInput type="password" placeholder="Passwort" formControlName="password">
            </mat-form-field>
            <div *ngIf="loginError" style="color: red; margin-bottom: 10px;">
              {{ loginError }}
            </div>
            <button mat-raised-button color="primary" type="submit" style="width: 100%;">
              Einloggen
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    const success = this.authService.login(username, password);
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.loginError = 'Ungültiger Benutzername oder Passwort';
    }
  }
}
