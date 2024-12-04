import { environment } from '../../environments/environment';

export const trips = {
  GET_TRIPS: `${environment.BASE_URL}/trips`,
  GET_TRIP_DETAIL: `${environment.BASE_URL}/trips/{id}`,
  GET_TRIP_OF_THE_DAY: `${environment.BASE_URL}/trips/trip-of-the-day`,
};
