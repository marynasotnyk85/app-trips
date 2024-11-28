import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: any;

  viewDetails() {
    console.log(`Viewing details for Trip ID: ${this.trip.id}`);
  }
}