// src/app/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = false;
  private isBrowser: boolean;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: any) {
    // Überprüfen, ob wir im Browser sind
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser && localStorage) {
      this.loggedIn = localStorage.getItem('loggedIn') === 'true';
    }
  }

  // Beispielhafte Login-Funktion (Benutzer: user, Passwort: pass)
  login(username: string, password: string): boolean {
    if (username === 'user' && password === 'pass') {
      this.loggedIn = true;
      if (this.isBrowser && localStorage) {
        localStorage.setItem('loggedIn', 'true');
      }
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
    if (this.isBrowser && localStorage) {
      localStorage.removeItem('loggedIn');
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
