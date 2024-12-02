import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../../store/trip.model';

@Component({
  selector: 'app-trip-of-the-day',
  templateUrl: './trip-of-the-day.component.html',
  styleUrls: ['./trip-of-the-day.component.css']
})
export class TripOfTheDayComponent {
  @Input() tripOfTheDay$!: Observable<Trip | null>; // Trip of the Day observable
  @Output() reload = new EventEmitter<void>(); // Emit event to reload Trip of the Day
  @Output() viewDetails = new EventEmitter<string>(); // Emit trip ID
  

ngOnInit () {
  this.reload.emit();
}
 

viewTripDetails(id: string): void {
  this.viewDetails.emit(id);
}

}
