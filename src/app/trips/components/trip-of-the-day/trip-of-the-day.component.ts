import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trip-of-the-day',
  templateUrl: './trip-of-the-day.component.html',
  styleUrls: ['./trip-of-the-day.component.css']
})
export class TripOfTheDayComponent {
  @Input() tripOfTheDay$!: Observable<any>; // Trip of the Day observable
  @Output() reload = new EventEmitter<void>(); // Emit event to reload Trip of the Day
  
ngOnInit () {
  this.reload.emit();
}
 
}
