import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './components/home/home.component';
import { ListTripsComponent } from './components/list-trips/list-trips.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { tripReducer } from './store/trip/trip.reducer';
import { TripEffects } from './store/trip/trip.effects';
import { TripsRoutingModule } from './trips-routing.module';
import { TripBadgeComponent } from '../shared/tripBadge/tripBadge.component';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { SortingComponent } from '../shared/sorting/sorting.component';
import { TripOfTheDayComponent } from './components/trip-of-the-day/trip-of-the-day.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';



@NgModule({
  declarations: [
    HomeComponent, 
    ListTripsComponent, 
    TripCardComponent, 
    TripOfTheDayComponent, 
    TripDetailComponent, 
    TripBadgeComponent,
    SortingComponent, 
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TripsRoutingModule,
    StoreModule.forFeature('trip', tripReducer),
    EffectsModule.forFeature([TripEffects]),
  ],
})
export class TripsModule {}
