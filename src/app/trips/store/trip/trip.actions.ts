import { createAction, props } from '@ngrx/store';
import { Trip } from '../trip.model';

/* LOAD LIST OF TRIPS */
export const loadTrips = createAction(
  '[Trip API] Load Trips',
  props<{
    filters: any;
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: string;
  }>() // Define filters dynamically
);

export const loadTripsSuccess = createAction(
  '[Trip API] Load Trips Success',
  props<{ trips: Trip[]; totalTrips: number; totalPages: number }>()
);

export const loadTripsFailure = createAction(
  '[Trip API] Load Trips Failure',
  props<{ error: string }>()
);

/* LOAD TRIP DETAIL */
export const loadTripDetail = createAction(
  '[Trip API] Load Trip Detail',
  props<{ id: string }>() // Pass trip id
);

export const loadTripDetailSuccess = createAction(
  '[Trip API] Load Trip Detail Success',
  props<{ trip: Trip }>()
);

export const loadTripDetailFailure = createAction(
  '[Trip API] Load Trip Detail Failure',
  props<{ error: string }>()
);

/* LOAD TRIP OF THE DAY  */

export const loadTripOfTheDay = createAction('[Trip API] Load Trip of the Day');

export const loadTripOfTheDaySuccess = createAction(
  '[Trip API] Load Trip of the Day Success',
  props<{ trip: Trip }>()
);

export const loadTripOfTheDayFailure = createAction(
  '[Trip API] Load Trip of the Day Failure',
  props<{ error: string }>()
);