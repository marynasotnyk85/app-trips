import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TripState } from '../trip.model';

/* Select the feature state */
export const selectTripState = createFeatureSelector<TripState>('trip');

/* Select all trips */
export const selectAllTrips = createSelector(
  selectTripState,
  (state) => state.trips || []
);

/* Select loading state */
export const selectLoading = createSelector(
  selectTripState,
  (state) => state.loading
);

/* Select error state */
export const selectError = createSelector(
  selectTripState,
  (state) => state.error
);

/* Select total trips */
export const selectTotalTrips = createSelector(
  selectTripState,
  (state) => state.totalTrips || 0
);

/* Select total pages */
export const selectTotalPages = createSelector(
  selectTripState,
  (state) => state.totalPages || 0
);

/* Select trip details*/
export const selectTripDetails = createSelector(
  selectTripState,
  (state) => state.tripDetail
);

/* LOAD TRIP OF THE DAY  */
export const selectTripOfTheDay = createSelector(
  selectTripState,
  (state: TripState) => state.tripOfTheDay
);

/* preserve sorting */

export const selectSortBy = createSelector(
  selectTripState,
  (state: TripState) => state.sortBy
);

export const selectSortOrder = createSelector(
  selectTripState,
  (state: TripState) => state.sortOrder
);
