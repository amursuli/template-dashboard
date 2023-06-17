import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ProfileComponent } from './profile/profile/profile.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { FaqsComponent } from './faqs/faqs.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profile-setting',
    component: SettingsComponent,
  },
  {
    path: 'faqs',
    component: FaqsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraPagesRoutingModule {}
