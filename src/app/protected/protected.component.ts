// src/app/protected.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-sidenav-container style="height: 100vh;">
      <!-- Navigation -->
      <mat-sidenav mode="side" opened class="sidenav">
        <mat-toolbar class="nav-toolbar">Navigation</mat-toolbar>
        <mat-nav-list>
          <!-- Die Links sollten zu den Kindrouten führen -->
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">Cockpit</a>
          <a mat-list-item routerLink="/personen" routerLinkActive="active">Personen</a>
          <a mat-list-item routerLink="/settings" routerLinkActive="active">Einstellungen</a>
          <a mat-list-item routerLink="/account" routerLinkActive="active">Benutzerkonto</a>
        </mat-nav-list>
      </mat-sidenav>
      
      <!-- Contentbereich -->
      <mat-sidenav-content>
        <mat-toolbar class="header">
          <span>Mein Dashboard</span>
          <span class="spacer"></span>
          <button mat-button (click)="logout()">
            <mat-icon>logout</mat-icon>
            Ausloggen
          </button>
        </mat-toolbar>
        <!-- Inneres Router-Outlet für Kindrouten -->
        <div style="padding: 16px;">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav {
      background-color: #f5f5f5;
    }
    .nav-toolbar {
      background-color: #f5f5f5;
      color: black;
    }
    .header {
      background-color: #424242;
      color: white;
    }
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class ProtectedComponent {
  constructor(private router: Router) { }

  logout() {
    // Implementiere hier deinen Logout-Prozess
    this.router.navigate(['/login']);
  }
}
