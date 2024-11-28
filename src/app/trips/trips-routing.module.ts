import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTripsComponent } from './components/list-trips/list-trips.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':id', component: TripDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsRoutingModule {}
