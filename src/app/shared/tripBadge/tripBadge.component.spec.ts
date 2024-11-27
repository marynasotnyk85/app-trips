import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-badge',
  template: `
    <div [ngClass]="tierClass">
      {{ tier }}
    </div>
  `,
})
export class TripBadgeComponent implements OnInit {
  @Input() rating!: number;
  @Input() nrOfRatings!: number;
  @Input() co2!: number;

  tier!: string;
  tierClass!: string;

  ngOnInit(): void {
    this.calculateTier();
  }

  private calculateTier(): void {
    const score = this.rating * this.nrOfRatings - this.co2; // Example calculation
    if (score > 1000) {
      this.tier = 'awesome';
      this.tierClass = 'awesome-class';
    } else if (score > 500) {
      this.tier = 'good';
      this.tierClass = 'good-class';
    } else {
      this.tier = 'average';
      this.tierClass = 'average-class';
    }
  }
}
