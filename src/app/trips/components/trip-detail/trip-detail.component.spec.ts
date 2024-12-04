import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripDetailComponent } from './trip-detail.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectTripDetails,
  selectLoading,
  selectError,
} from 'src/app/trips/store/trip/trip.selectors';
import { loadTripDetail } from 'src/app/trips/store/trip/trip.actions';
import { of } from 'rxjs';

describe('TripDetailComponent', () => {
  let component: TripDetailComponent;
  let fixture: ComponentFixture<TripDetailComponent>;
  let mockStore: MockStore;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: ActivatedRoute;

  const initialState = {
    trip: {
      tripDetail: null,
      loading: false,
      error: null,
    },
    loading: false,
    error: null,
  };

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('123'),
        },
      },
    } as any;

    await TestBed.configureTestingModule({
      declarations: [TripDetailComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(TripDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTripDetail action on init', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    component.ngOnInit();
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(dispatchSpy).toHaveBeenCalledWith(loadTripDetail({ id: '123' }));
  });

  it('should select trip details from the store', () => {
    const tripMock = {
      id: '123',
      title: 'Test Trip',
      description: 'Test Trip',
      price: 1236.6,
      rating: 4,
      nrOfRatings: 2,
      verticalType: 'Test Trip',
      tags: [],
      co2: 3,
      thumbnailUrl: 'https://picsum.photos/id/511/200/200',
      imageUrl: 'https://picsum.photos/id/511/200/200',
      creationDate: '',
    };
    mockStore.overrideSelector(selectTripDetails, tripMock);

    component.trip$.subscribe((trip) => {
      expect(trip).toEqual(tripMock);
    });
  });

  it('should select loading state from the store', () => {
    mockStore.overrideSelector(selectLoading, true);

    component.loading$.subscribe((loading) => {
      expect(loading).toBeTrue();
    });
  });

  it('should select error state from the store', () => {
    const errorMock = 'Error loading trip';
    mockStore.overrideSelector(selectError, errorMock);

    component.error$.subscribe((error) => {
      expect(error).toBe(errorMock);
    });
  });

  it('should navigate back to /trips when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/trips'], {
      queryParamsHandling: 'preserve',
    });
  });
});
