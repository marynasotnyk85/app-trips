import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../store/trip.model';
import { Observable, combineLatest, map } from 'rxjs';
import {
  loadTripDetail,
  resetTripDetail,
} from 'src/app/trips/store/trip/trip.actions';
import { Store } from '@ngrx/store';
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
  trip$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  imageSrc: string = '';
  isImageLoading: boolean = true;

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
    // update the imageSrc
    this.trip$.subscribe((trip) => {
      if (trip) {
        this.isImageLoading = true;
        this.imageSrc = trip.imageUrl;
      }
    });
  }

  onImageLoad(): void {
    this.isImageLoading = false;
  }

  // Go back to the home page
  goBack(): void {
    this.router.navigate(['/trips'], {
      queryParamsHandling: 'preserve',
    });
  }
  ngOnDestroy(): void {
    this.store.dispatch(resetTripDetail());
  }
}
