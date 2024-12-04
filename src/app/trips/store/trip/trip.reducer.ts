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
  resetTripDetail,
} from './trip.actions';
import { TripState } from '../trip.model';
import { settings } from '../../../constants/constants.settings';

export const initialState: TripState = {
  trips: [],
  tripDetail: null,
  loading: false,
  error: null,
  page: 1,
  limit: settings.limit_cards_in_page,
  totalTrips: 0,
  totalPages: 0,
  sortBy: settings.sortBy,
  sortOrder: settings.sortOrder,
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
    trips: trips,
    totalTrips: totalTrips,
    totalPages: totalPages,
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
  on(resetTripDetail, (state) => ({
    ...state,
    tripDetails: null,
    error: null,
    loading: false,
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
