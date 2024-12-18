import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { TripService } from '../../services/trip.service';
import {
  loadTrips,
  loadTripsSuccess,
  loadTripsFailure,
  loadTripDetail,
  loadTripDetailSuccess,
  loadTripDetailFailure,
  loadTripOfTheDay,
  loadTripOfTheDaySuccess,
  loadTripOfTheDayFailure,
  resetTripDetail,
} from './trip.actions';

@Injectable()
export class TripEffects {
  constructor(private actions$: Actions, private tripService: TripService) {}

  loadTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTrips),
      switchMap(({ page, limit, sortBy, sortOrder }) =>
        this.tripService.getTrips(page, limit, sortBy, sortOrder).pipe(
          map((response) => {
            return loadTripsSuccess({
              trips: response.items,
              totalTrips: response.total,
              totalPages: Math.ceil(response.total / response.limit), // Calculate total pages
            });
          }),
          catchError((error) => {
            console.error('API Error:', error);
            return of(loadTripsFailure({ error: error.message }));
          })
        )
      )
    )
  );

  /* Effect for loading a single trip by id */
  loadTripDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTripDetail),
      switchMap(({ id }) =>
        this.tripService.getTripDetails(id).pipe(
          map((trip) => loadTripDetailSuccess({ trip })),
          catchError((error) =>
            of(loadTripDetailFailure({ error: error.message }))
          )
        )
      )
    )
  );

  resetTripDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(resetTripDetail),
        // Here you can handle post-reset logic
        tap(() => {
          console.log('Trip details reset');
        })
      ),
    { dispatch: false }
  );

  loadTripOfTheDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTripOfTheDay),
      switchMap(() => {
        const cachedData = localStorage.getItem('tripOfTheDayData');
        const todayUTC = new Date().toISOString().split('T')[0]; // UTC date

        if (cachedData) {
          const { date, trip } = JSON.parse(cachedData);

          // If the cached date matches today's UTC date, return the cached trip
          if (date === todayUTC) {
            return of(loadTripOfTheDaySuccess({ trip }));
          }
        }

        // If no valid cache, fetch a new trip
        return this.tripService.getTripOfTheDay().pipe(
          map((trip) => {
            const tripDate = todayUTC;
            localStorage.setItem(
              'tripOfTheDayData',
              JSON.stringify({ date: tripDate, trip })
            );
            return loadTripOfTheDaySuccess({ trip });
          }),
          catchError((error) => of(loadTripOfTheDayFailure({ error })))
        );
      })
    )
  );
}
