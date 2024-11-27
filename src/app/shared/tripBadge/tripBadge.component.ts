import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trip-badge',
  template: `
    <div class="badge" [ngClass]="tier">
      <span>{{ tier }}</span>
    </div>
  `,
  styles: [
    `
      .badge {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 8px;
        text-align: center;
        color: white;
        font-weight: bold;
      }
      .average {
        background-color: #ffb74d; /* Amber */
      }
      .good {
        background-color: #4caf50; /* Green */
      }
      .awesome {
        background-color: #2196f3; /* Blue */
      }
    `,
  ],
})
export class TripBadgeComponent {
  @Input() rating!: number;
  @Input() nrOfRatings!: number;
  @Input() co2!: number;

  tier: string = 'average';

  ngOnChanges(): void {
    const score = this.calculateScore(this.rating, this.nrOfRatings, this.co2);
    this.tier = this.getTier(score);
  }

  private calculateScore(
    rating: number,
    nrOfRatings: number,
    co2: number
  ): number {
    return rating * 0.6 + Math.log10(nrOfRatings) * 0.3 - (co2 / 1000) * 0.1;
  }

  private getTier(score: number): string {
    if (score >= 4.5) return 'awesome';
    if (score >= 3.0) return 'good';
    return 'average';
  }
}
