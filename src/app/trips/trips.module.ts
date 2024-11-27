import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ListTripsComponent } from './components/list-trips/list-trips.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { tripReducer } from './store/trip/trip.reducer';
import { TripEffects } from './store/trip/trip.effects';
import { TripsRoutingModule } from './trips-routing.module';
import { TripBadgeComponent } from '../shared/tripBadge/tripBadge.component';

@NgModule({
  declarations: [ListTripsComponent, TripDetailComponent, TripBadgeComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TripsRoutingModule,
    // Register feature reducer
    StoreModule.forFeature('trip', tripReducer),
    EffectsModule.forFeature([TripEffects]),
  ],
})
export class TripsModule {}
