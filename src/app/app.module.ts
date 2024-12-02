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
import { FooterComponent } from './shared/footer/footer.component';



@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({}), 
    EffectsModule.forRoot([]), 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
