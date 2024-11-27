import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTripsComponent } from './list-trips.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { loadTrips, loadTripOfTheDay } from '../../store/trip/trip.actions';
import {
  selectAllTrips,
  selectLoading,
  selectError,
  selectSortBy,
  selectSortOrder,
} from '../../store/trip/trip.selectors';
import { of } from 'rxjs';

describe('ListTripsComponent', () => {
  let component: ListTripsComponent;
  let fixture: ComponentFixture<ListTripsComponent>;
  let store: MockStore;
  let router: jasmine.SpyObj<Router>;

  const initialState = {
    trips: [],
    loading: false,
    error: null,
    totalPages: 1,
  };

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ListTripsComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: routerSpy },
        { provide: TripService, useValue: {} }, // Mock TripService if needed
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(ListTripsComponent);
    component = fixture.componentInstance;

    // Mock selectors
    store.overrideSelector(selectAllTrips, []);
    store.overrideSelector(selectLoading, false);
    store.overrideSelector(selectError, null);
    store.overrideSelector(selectSortBy, 'name');
    store.overrideSelector(selectSortOrder, 'ASC');

    fixture.detectChanges();
  });
  afterAll(() => {
    store?.resetSelectors();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct observables', () => {
    component.ngOnInit();
    expect(component.trips$).toBeDefined();
    expect(component.loading$).toBeDefined();
    expect(component.error$).toBeDefined();
  });

  it('should dispatch loadTrips on loadTrips call', () => {
    spyOn(store, 'dispatch');
    component.loadTrips();
    expect(store.dispatch).toHaveBeenCalledWith(
      loadTrips({
        filters: {},
        page: component.currentPage,
        limit: component.limit,
        sortBy: component.sortBy,
        sortOrder: component.sortOrder,
      })
    );
  });

  it('should navigate to trip details on viewTripDetails', () => {
    const tripId = '123';
    component.viewTripDetails(tripId);
    expect(router.navigate).toHaveBeenCalledWith(['/trips', tripId]);
  });

  it('should dispatch loadTripOfTheDay on getTripOfTheDay call', () => {
    spyOn(store, 'dispatch');
    component.getTripOfTheDay();
    expect(store.dispatch).toHaveBeenCalledWith(loadTripOfTheDay());
  });

  it('should increment currentPage and reload trips on nextPage', () => {
    spyOn(component, 'loadTrips');
    component.currentPage = 1;
    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(component.loadTrips).toHaveBeenCalled();
  });

  it('should decrement currentPage and reload trips on previousPage', () => {
    spyOn(component, 'loadTrips');
    component.currentPage = 2;
    component.previousPage();
    expect(component.currentPage).toBe(1);
    expect(component.loadTrips).toHaveBeenCalled();
  });

  it('should not decrement currentPage below 1 on previousPage', () => {
    spyOn(component, 'loadTrips');
    component.currentPage = 1;
    component.previousPage();
    expect(component.currentPage).toBe(1);
    expect(component.loadTrips).not.toHaveBeenCalled();
  });
});
