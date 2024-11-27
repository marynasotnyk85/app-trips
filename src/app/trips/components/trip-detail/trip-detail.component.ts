import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip, TripState } from '../../store/trip.model';
import { catchError, map, Observable, of } from 'rxjs';
import {
  loadTripDetail,
  loadTripDetailSuccess,
  loadTrips,
} from 'src/app/trips/store/trip/trip.actions';
import { Store, select } from '@ngrx/store';
import {
  selectError,
  selectLoading,
  selectTripDetails,
} from 'src/app/trips/store/trip/trip.selectors';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css'],
})
export class TripDetailComponent implements OnInit {
  trip$: Observable<Trip | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.trip$ = this.store.select(selectTripDetails);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(loadTripDetail({ id: tripId }));
  }

  // Go back to the home page
  goBack(): void {
    this.router.navigate(['/trips'], {
      queryParamsHandling: 'preserve',
    }); // Navigate to the home page
  }
}