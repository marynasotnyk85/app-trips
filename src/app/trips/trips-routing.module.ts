import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  // Trips home
  { path: '', component: HomeComponent },
  // Trip detail with 
  { path: ':id', component: TripDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsRoutingModule {}
