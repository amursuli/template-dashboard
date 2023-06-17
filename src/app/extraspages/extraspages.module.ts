import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component pages
import { ExtrapagesRoutingModule } from './extraspages-routing.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [CommonModule, ExtrapagesRoutingModule],
})
export class ExtraspagesModule {}
