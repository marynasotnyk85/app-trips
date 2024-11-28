import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TripService } from './trip.service';
import { trips } from '../../constants/constants.endpoint';
import { Trip } from '../store/trip.model';

describe('TripService', () => {
  let service: TripService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TripService],
    });
    service = TestBed.inject(TripService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTrips', () => {
    it('should fetch trips with the correct parameters', () => {
      const mockResponse = {
        trips: [{ id: '1', name: 'Trip 1' }],
        totalTrips: 1,
        totalPages: 1,
      };

      const filters = { type: 'adventure' };
      const page = 1;
      const limit = 9;
      const sortBy = 'name';
      const sortOrder = 'asc';

      service
        .getTrips(filters, page, limit, sortBy, sortOrder)
        .subscribe((response) => {
          expect(response).toEqual(mockResponse);
        });

      const req = httpMock.expectOne(
        (req) =>
          req.url === trips.GET_TRIPS &&
          req.params.get('page') === page.toString() &&
          req.params.get('limit') === limit.toString() &&
          req.params.get('sortBy') === sortBy &&
          req.params.get('sortOrder') === sortOrder &&
          req.params.get('type') === filters.type
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle errors gracefully', () => {
      const filters = {};
      const page = 1;
      const limit = 9;
      const sortBy = '';
      const sortOrder = 'ASC';

      /*  service.getTrips(filters, page, limit, sortBy, sortOrder).subscribe({
        next: () => fail('Expected error, but got success'),
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne(trips.GET_TRIPS);
      req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
    });
    */
      service.getTrips(filters, page, limit, sortBy, sortOrder).subscribe(
        () => fail('Expected an error, not trips'),
        (error) => {
          expect(error).toBeTruthy();
        }
      );

      const req = httpMock.expectOne((request) => {
        // Validate the base URL and query parameters
        return (
          request.url === trips.GET_TRIPS &&
          request.params.get('page') === '1' &&
          request.params.get('limit') === '9' &&
          request.params.get('sortBy') === '' &&
          request.params.get('sortOrder') === 'ASC'
        );
      });
      // Simulate an error response
      req.flush('Error occurred', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    });
  });

  describe('getTripDetails', () => {
    it('should fetch trip details by ID', () => {
      const mockResponse: Trip = { id: '1', title: 'Trip 1' } as Trip;
      const tripId = '1';

      service.getTripDetails(tripId).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        trips.GET_TRIP_DETAIL.replace('{id}', tripId)
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle errors for trip details', () => {
      const tripId = '1';

      service.getTripDetails(tripId).subscribe({
        next: () => fail('Expected error, but got success'),
        error: (error) => {
          expect(error.status).toBe(404);
        },
      });

      const req = httpMock.expectOne(
        trips.GET_TRIP_DETAIL.replace('{id}', tripId)
      );
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getTripOfTheDay', () => {
    it('should fetch the trip of the day', () => {
      const mockResponse: Trip = { id: '1', title: 'Trip of the Day' } as Trip;

      service.getTripOfTheDay().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(trips.GET_TRIP_OF_THE_DAY);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle errors for trip of the day', () => {
      service.getTripOfTheDay().subscribe({
        next: () => fail('Expected error, but got success'),
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne(trips.GET_TRIP_OF_THE_DAY);
      req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
