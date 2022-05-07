import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LineOfBusinessComponent } from './linesOfBusiness/linesOfBusiness.component';
import { LineOfBusinessDetailComponent } from './lineOfBusiness-detail/lineOfBusiness-detail.component';
import { PopularInfoComponent } from './popularInfo/popularInfo.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: LineOfBusinessDetailComponent },
  { path: 'linesOfBusiness', component: LineOfBusinessComponent },
  { path: 'popularInfo', component: PopularInfoComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
