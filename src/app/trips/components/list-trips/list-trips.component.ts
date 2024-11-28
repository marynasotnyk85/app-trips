import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
})
export class ListTripsComponent {
  @Input() trips$!: Observable<any[]>; // Trips data
  @Input() currentPage!: number; // Current page
  @Input() totalPages!: number;
  @Input() totalTrips$!: Observable<number>; // Total trips
  @Output() onPageChange = new EventEmitter<number>(); // Pagination event
  @Output() onViewDetails = new EventEmitter<string>(); // Trip details event

  ngOnInit() {
  }
  viewTripDetails(id: string): void {
    this.onViewDetails.emit(id);
  }

  nextPage(): void {
    this.onPageChange.emit(this.currentPage + 1);
  }

  previousPage(): void {
    this.onPageChange.emit(this.currentPage - 1);
  }
}
