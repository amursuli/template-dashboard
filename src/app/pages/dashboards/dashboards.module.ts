import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbTypeaheadModule,
  NgbPaginationModule,
  NgbTooltipModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
import { FlatpickrModule } from 'angularx-flatpickr';

//Module
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { WidgetModule } from '../../shared/widget/widget.module';

// Component
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    NgbToastModule,
    LeafletModule,
    NgbDropdownModule,
    NgbNavModule,
    SimplebarAngularModule,
    NgApexchartsModule,
    FlatpickrModule.forRoot(),
    DashboardsRoutingModule,
    SharedModule,
    WidgetModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardsModule {}
