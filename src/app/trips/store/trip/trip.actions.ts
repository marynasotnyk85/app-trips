import { createAction, props } from '@ngrx/store';
import { Trip } from '../trip.model';

/* LOAD LIST OF TRIPS */
export const loadTrips = createAction(
  '[Trip API] Load Trips',
  props<{
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: string;
  }>()
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
  props<{ id: string }>()
);

export const loadTripDetailSuccess = createAction(
  '[Trip API] Load Trip Detail Success',
  props<{ trip: Trip }>()
);

export const loadTripDetailFailure = createAction(
  '[Trip API] Load Trip Detail Failure',
  props<{ error: string }>()
);

export const resetTripDetail = createAction('[Trip] Reset Trip Details');

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
