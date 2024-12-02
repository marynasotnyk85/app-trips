import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Trip, TripState } from '../../store/trip.model';
import { loadTripOfTheDay, loadTrips  } from '../../store/trip/trip.actions';
import {
  selectAllTrips,
  selectError,
  selectLoading,
  selectTripOfTheDay,
  selectTotalPages,
  selectTotalTrips,
} from '../../store/trip/trip.selectors';

import { settings } from '../../../constants/constants.endpoint';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

  trips$!: Observable<any[]>; // Observable for trips data
  loading$!: Observable<boolean>; // Loading state
  error$!: Observable<string | null>; // Error messages
  tripOfTheDay$! : Observable<Trip | null>; //= this.store.select(selectTripOfTheDay); // Trip of the day
  totalPages$!: Observable<number>;
  totalTrips$!: Observable<number>;


  totalPages!: number;



  currentPage = 1; // Pagination state
  limit =  settings.limit_cards_in_page; // Items per page
  sortBy = 'creationDate';
  sortOrder = 'ASC';
  isTripOfTheDayVisible = false; 
  totalPagination!:number;



  constructor(private store: Store<TripState>, private router: Router,  private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || this.currentPage;
      this.sortBy = params['sortBy'] || this.sortBy;
      this.sortOrder = params['sortOrder'] || this.sortOrder;
  
      // Reload trips based on query params
      this.loadTrips();
    });
    
    // Fetch trips and trip of the day
    this.trips$ = this.store.select(selectAllTrips);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.totalPages$ = this.store.select(selectTotalPages);
    this.totalTrips$ = this.store.select(selectTotalTrips);
    this.tripOfTheDay$ = this.store.select(selectTripOfTheDay);

    this.totalPages$.subscribe((pages) => {
      this.totalPages = pages;
    });

    // Load initial data
    this.loadTrips();
  }


  loadTrips(): void {
    this.store.dispatch(
      loadTrips({
        page: this.currentPage,
        limit: this.limit,
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      })
    );
   
  }

   // Toggle "Trip of the Day" view
   toggleTripOfTheDay(): void {
    this.isTripOfTheDayVisible = !this.isTripOfTheDayVisible;
       if (this.isTripOfTheDayVisible) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
  }

  getTripOfTheDay(): void {
    this.store.dispatch(loadTripOfTheDay());
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.loadTrips();
  }

  applySorting({ sortBy, sortOrder }: { sortBy: string; sortOrder: string }): void {

    if (this.sortBy === sortBy && this.sortOrder === sortOrder) {
      return; // No need to reload if sort parameters are unchanged
    }
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    this.loadTrips();
  }

 

  // Method to handle navigation to trip details
  viewTripDetails(tripId: string): void {
    this.router.navigate(['/trips', tripId], {
      queryParams: {
        page: this.currentPage,
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      },
    });
  }
}
