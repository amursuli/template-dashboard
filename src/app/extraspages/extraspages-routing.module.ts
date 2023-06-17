import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { MaintenanceComponent } from './maintenance/maintenance.component';

const routes: Routes = [
  {
    path: 'maintenance',
    component: MaintenanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtrapagesRoutingModule {}
