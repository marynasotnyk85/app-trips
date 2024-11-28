import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tripReducer } from './trips/store/trip/trip.reducer';
import { TripEffects } from './trips/store/trip/trip.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTripsComponent } from './trips/components/list-trips/list-trips.component';
import { TripDetailComponent } from './trips/components/trip-detail/trip-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({}), // Root state (empty if no global state)
    EffectsModule.forRoot([]), // Root effects (empty for now)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
