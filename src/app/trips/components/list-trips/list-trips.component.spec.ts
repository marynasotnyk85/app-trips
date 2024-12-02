import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTripsComponent } from './list-trips.component';
import { of } from 'rxjs';

describe('ListTripsComponent', () => {
  let component: ListTripsComponent;
  let fixture: ComponentFixture<ListTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTripsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTripsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('viewTripDetails', () => {
    it('should emit the correct trip ID', () => {
      spyOn(component.onViewDetails, 'emit');

      const tripId = '123';
      component.viewTripDetails(tripId);

      expect(component.onViewDetails.emit).toHaveBeenCalledWith(tripId);
    });
  });

  describe('nextPage', () => {
    it('should emit the next page number if currentPage < totalPages', () => {
      component.currentPage = 1;
      component.totalPages = 3;

      spyOn(component.onPageChange, 'emit');
      component.nextPage();

      expect(component.onPageChange.emit).toHaveBeenCalledWith(2);
    });

    it('should not emit if currentPage >= totalPages', () => {
      component.currentPage = 3;
      component.totalPages = 3;

      spyOn(component.onPageChange, 'emit');
      component.nextPage();

      expect(component.onPageChange.emit).not.toHaveBeenCalled();
    });
  });

  describe('previousPage', () => {
    it('should emit the previous page number if currentPage > 1', () => {
      component.currentPage = 2;

      spyOn(component.onPageChange, 'emit');
      component.previousPage();

      expect(component.onPageChange.emit).toHaveBeenCalledWith(1);
    });

    it('should not emit if currentPage <= 1', () => {
      component.currentPage = 1;

      spyOn(component.onPageChange, 'emit');
      component.previousPage();

      expect(component.onPageChange.emit).not.toHaveBeenCalled();
    });
  });
});
