import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: '',
    loadChildren: () => import('./dashboards/dashboards.module').then((m) => m.DashboardsModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./extrapages/extraspages.module').then((m) => m.ExtraspagesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
