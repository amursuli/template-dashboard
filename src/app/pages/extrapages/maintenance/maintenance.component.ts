import { Component } from '@angular/core';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
})

/**
 * Maintenance Component
 */
export class MaintenanceComponent {
  // set the current year
  year: number = new Date().getFullYear();
}
