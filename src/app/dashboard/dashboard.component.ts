// src/app/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="dashboard-container">
      <!-- KPI-Bereich -->
      <div class="kpi-grid">
        <mat-card class="kpi-card" *ngFor="let kpi of kpis">
          <div class="kpi-content">
            <mat-icon class="kpi-icon">{{ kpi.icon }}</mat-icon>
            <div class="kpi-info">
              <div class="kpi-value">{{ kpi.value }}</div>
              <div class="kpi-label">{{ kpi.label }}</div>
            </div>
          </div>
        </mat-card>
      </div>
      
      <!-- Platzhalter für weitere Informationen -->
      <div class="placeholder">
        <h3>Weitere Informationen</h3>
        <p>Hier können in Zukunft zusätzliche Diagramme oder weitere KPIs angezeigt werden.</p>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 16px;
    }
    /* KPI-Grid: Responsive Anordnung der KPI-Karten */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    .kpi-card {
      padding: 16px;
      display: flex;
      align-items: center;
    }
    .kpi-content {
      display: flex;
      align-items: center;
    }
    .kpi-icon {
      font-size: 48px;
      color: #3f51b5;
      margin-right: 16px;
    }
    .kpi-info {
      text-align: left;
    }
    .kpi-value {
      font-size: 24px;
      font-weight: bold;
    }
    .kpi-label {
      font-size: 14px;
      color: #666;
    }
    .placeholder {
      text-align: center;
      color: #999;
      border-top: 1px solid #eee;
      padding-top: 16px;
    }
  `]
})
export class DashboardComponent {
  kpis = [
    { icon: 'attach_money', value: '$12,345', label: 'Umsatz' },
    { icon: 'people', value: '1,234', label: 'Kunden' },
    { icon: 'shopping_cart', value: '567', label: 'Bestellungen' },
    { icon: 'trending_up', value: '23%', label: 'Wachstum' },
    { icon: 'star', value: '4.8', label: 'Kundenzufriedenheit' },
    { icon: 'timeline', value: '123', label: 'Neue Leads' }
  ];
}
