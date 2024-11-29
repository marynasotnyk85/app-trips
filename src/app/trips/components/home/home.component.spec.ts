import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { selectAllTrips, selectLoading, selectError, selectTripOfTheDay, selectTotalPages, selectTotalTrips } from '../../store/trip/trip.selectors';
import { loadTrips, loadTripOfTheDay } from '../../store/trip/trip.actions';
import { TripState } from '../../store/trip.model';
import { Router } from '@angular/router';

// Mock Store and Observables
class MockStore {
  select(selector: any) {
    switch (selector) {
      case selectAllTrips: return of([]);
      case selectLoading: return of(false);
      case selectError: return of(null);
      case selectTripOfTheDay: return of(null);
      case selectTotalPages: return of(1);
      case selectTotalTrips: return of(10);
      default: return of([]);
    }
  }
  dispatch(action: any) {}
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        StoreModule.forRoot({}), // Add necessary reducers
        RouterTestingModule
      ],
      providers: [
        { provide: Store, useClass: MockStore }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // This allows 'app-sorting' without errors
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  it('should toggle isTripOfTheDayVisible and scroll to top if visible', () => {
    component.toggleTripOfTheDay();
    expect(component.isTripOfTheDayVisible).toBe(true);
    spyOn(window, 'scrollTo').and.callFake((...args: any[]) => {
        if (args.length === 1 && typeof args[0] === 'object') {
          // Handle ScrollToOptions
          expect(args[0]).toEqual({ top: 0, behavior: 'smooth' });
        } else if (args.length === 2) {
          // Handle x, y
          expect(args[0]).toBe(0);
          expect(args[1]).toBe(0);
        }
      });
  });

  it('should dispatch loadTripOfTheDay action', () => {
    spyOn(mockStore, 'dispatch');
    component.getTripOfTheDay();
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadTripOfTheDay());
  });

  it('should dispatch loadTrips action with current state', () => {
    spyOn(mockStore, 'dispatch');
    component.loadTrips();
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadTrips({
      filters: {},
      page: component.currentPage,
      limit: component.limit,
      sortBy: component.sortBy,
      sortOrder: component.sortOrder,
    }));
  });

  it('should update sortBy, sortOrder, and call loadTrips', () => {
    spyOn(component, 'loadTrips');
    component.applySorting('price', 'DESC');
    expect(component.sortBy).toBe('price');
    expect(component.sortOrder).toBe('DESC');
    expect(component.loadTrips).toHaveBeenCalled();
  });

  it('should update currentPage and call loadTrips', () => {
    spyOn(component, 'loadTrips');
    component.changePage(2);
    expect(component.currentPage).toBe(2);
    expect(component.loadTrips).toHaveBeenCalled();
  });

  it('should navigate to the trip details page', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.viewTripDetails('123');
    expect(router.navigate).toHaveBeenCalledWith(['/trips', '123']);
  });

  it('should initialize observables and dispatch loadTrips', () => {
    spyOn(mockStore, 'dispatch');
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadTrips({
      filters: {},
      page: component.currentPage,
      limit: component.limit,
      sortBy: component.sortBy,
      sortOrder: component.sortOrder,
    }));
  });
});
