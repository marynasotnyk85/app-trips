import { createReducer, on } from '@ngrx/store';
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
} from './trip.actions';
import { TripState } from '../trip.model';

/* Define state for trips and trip detail */
/*export interface TripState {
  trips: Trip[];
  tripDetail: Trip | null;
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
}
  */

export const initialState: TripState = {
  trips: [],
  tripDetail: null,
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  totalTrips: 0,
  totalPages: 0,
  sortBy: '',
  sortOrder: 'ASC',
  tripOfTheDay: null,
};

export const tripReducer = createReducer(
  initialState,
  on(loadTrips, (state, { page, limit, sortBy, sortOrder }) => ({
    ...state,
    loading: true,
    error: null,
    page,
    limit,
    sortBy,
    sortOrder,
  })),
  on(loadTripsSuccess, (state, { trips, totalTrips, totalPages }) => ({
    ...state,
    trips: trips || [],
    totalTrips: totalTrips || 0,
    totalPages: totalPages || 0,
    loading: false,
  })),
  on(loadTripsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  /* Handle loading trip details */
  on(loadTripDetail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadTripDetailSuccess, (state, { trip }) => ({
    ...state,
    tripDetail: trip,
    loading: false,
  })),
  on(loadTripDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  /* LOAD TRIP OF THE DAY  */
  on(loadTripOfTheDay, (state) => ({ ...state, loading: true })),
  on(loadTripOfTheDaySuccess, (state, { trip }) => ({
    ...state,
    loading: false,
    tripOfTheDay: trip,
  })),
  on(loadTripOfTheDayFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
