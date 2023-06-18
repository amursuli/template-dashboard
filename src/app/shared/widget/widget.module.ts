import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTooltipModule, NgbProgressbarModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    NgbDropdownModule,
    FeatherModule.pick(allIcons),
    NgApexchartsModule,
  ],
  exports: [],
})
export class WidgetModule {}
