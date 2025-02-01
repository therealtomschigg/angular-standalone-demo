// src/app/protected.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div style="text-align: center; margin-top: 50px;">
      <h1>Geschützter Bereich</h1>
      <p>Willkommen! Du bist eingeloggt.</p>
      <button mat-raised-button color="warn" (click)="logout()">Ausloggen</button>
    </div>
  `
})
export class ProtectedComponent {
  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
