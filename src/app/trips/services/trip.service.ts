import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Trip } from '../store/trip.model';
import { trips } from '../../constants/constants.endpoint';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  private apiUrl =
    'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips';

  constructor(private http: HttpClient) {}
  /**
   * Fetch list of trips with optional filters, pagination, and sorting.
   * @param filters - Object containing filter key-value pairs.
   * @param page - Current page number.
   * @param limit - Number of items per page.
   * @param sortBy - Field to sort by.
   * @param sortOrder - Sorting order ('asc' or 'desc').
   */

  getTrips(
    filters: any,
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: string
  ): Observable<any> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null); // Reset error before making the request

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sortBy', sortBy.toString())
      .set('sortOrder', sortOrder.toString());

    Object.keys(filters).forEach((key) => {
      if (filters[key] !== undefined) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http
      .get<{ trips: Trip[]; totalTrips: number; totalPages: number }>(
        trips.GET_TRIPS,
        { params }
      )
      .pipe(
        tap((data) => console.log('Trip Service Data:', data)), // Log response data
        catchError((error) => {
          console.error('Trip Service Error:', error);
          throw error;
        })
      );
  }

  /**
   * Fetch trip details by ID.
   * @param id - Trip ID.
   */
  getTripDetails(id: string): Observable<Trip> {
    const endpoint = trips.GET_TRIP_DETAIL.replace('{id}', id); // Replace placeholder with actual ID
    return this.http.get<Trip>(endpoint).pipe(
      tap((data) => console.log('Trip Details:', data)), // Log response
      catchError((error) => {
        this.errorSubject.next('Failed to fetch trip details.');
        console.error('Trip Details Error:', error);
        throw error;
      })
    );
  }

  /**
   * Fetch a random trip of the day.
   */
  getTripOfTheDay(): Observable<Trip> {
    return this.http.get<Trip>(trips.GET_TRIP_OF_THE_DAY).pipe(
      tap((data) => console.log('Trip of the Day:', data)), // Log response
      catchError((error) => {
        this.errorSubject.next('Failed to fetch trip of the day.');
        console.error('Trip of the Day Error:', error);
        throw error;
      })
    );
  }
}