import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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

  it('should fetch trip details by ID', () => {
    const tripId = '123';
    const mockTrip: Trip = { id: tripId, title: 'Trip 123' } as Trip;

    service.getTripDetails(tripId).subscribe((trip) => {
      expect(trip).toEqual(mockTrip);
    });

    const req = httpMock.expectOne(trips.GET_TRIP_DETAIL.replace('{id}', tripId));
    expect(req.request.method).toBe('GET');
    req.flush(mockTrip);
  });

  it('should fetch trip of the day', () => {
    const mockTrip: Trip = { id: '999', title: 'Trip of the Day' } as Trip;

    service.getTripOfTheDay().subscribe((trip) => {
      expect(trip).toEqual(mockTrip);
    });

    const req = httpMock.expectOne(trips.GET_TRIP_OF_THE_DAY);
    expect(req.request.method).toBe('GET');
    req.flush(mockTrip);
  });

  


});
