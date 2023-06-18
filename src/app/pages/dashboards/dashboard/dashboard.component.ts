import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

/**
 * Dashboard Component
 */
export class DashboardComponent {
  date: Date = new Date();
}
