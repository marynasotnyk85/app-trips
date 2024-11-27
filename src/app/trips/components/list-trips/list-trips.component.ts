import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { TripService } from '../../services/trip.service';
import { Store, select } from '@ngrx/store';
import { Trip, TripState } from '../../store/trip.model';
import { Router } from '@angular/router';

import {
  selectAllTrips,
  selectError,
  selectLoading,
  selectSortBy,
  selectSortOrder,
  selectTotalPages,
  selectTripOfTheDay,
} from 'src/app/trips/store/trip/trip.selectors';
import {
  loadTripOfTheDay,
  loadTrips,
} from 'src/app/trips/store/trip/trip.actions';

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.css'],
})
export class ListTripsComponent implements OnInit {
  trips$!: Observable<any[]>; // Observable for the trips data Trips[]
  loading$!: Observable<boolean>; // Observable for the loading state
  error$!: Observable<string | null>; // Observable for error message
  totalTrips$!: Observable<number>; // Observable for totalTrips
  totalPages$!: Observable<number>; // Observable for totalPages
  tripOfTheDay$ = this.store.select(selectTripOfTheDay);

  currentPage = 1; // Default to page 1
  limit = 10; // Default to 10 items per page
  sortBy = '';
  sortOrder = 'ASC';

  constructor(
    private tripService: TripService,
    private store: Store<TripState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize observables from the store
    this.trips$ = this.store.select(selectAllTrips);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.totalPages$ = this.store.select(selectTotalPages);

    // Dispatch the action to load trips
    // this.loadTrips();

    combineLatest([
      this.store.select(selectSortBy),
      this.store.select(selectSortOrder),
    ]).subscribe(([sortBy, sortOrder]) => {
      this.sortBy = sortBy || '';
      this.sortOrder = sortOrder || 'ASC';
      this.loadTrips();
    });

    this.store.select(selectAllTrips).subscribe((trips) => {
      console.log('Trips from selector:', trips);
    });
  }

  loadTrips(): void {
    const filters = {}; // Add filters dynamically based on your requirements
    /*const page = this.currentPage;
    const limit = this.limit;
    const sortBy = this.sortBy;
    const sortOrder = this.sortOrder;
    */

    this.store.dispatch(
      loadTrips({
        filters,
        page: this.currentPage,
        limit: this.limit,
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      })
    );
    this.store.subscribe((state) =>
      console.log('State after dispatch:', state)
    );
  }

  // Navigate to the trip details page
  viewTripDetails(id: string): void {
    this.router.navigate(['/trips', id]);
  }

  getTripOfTheDay(): void {
    this.store.dispatch(loadTripOfTheDay());
  }

  // Function to load next page
  nextPage(): void {
    // if (this.currentPage < this.totalPages$) {
    this.currentPage++;
    this.loadTrips(); // Reload trips with updated page
    //  }
  }

  // Function to load previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTrips(); // Reload trips with updated page
    }
  }

  // Apply sorting based on selected criteria
  applySorting(): void {
    this.loadTrips(); // Reload trips with updated sort parameters
  }
}
