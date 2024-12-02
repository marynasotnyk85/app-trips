import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent {
  @Input() sortBy = ''; // Receive default sortBy from parent
  @Input() sortOrder = ''; // Receive default sortOrder from parent
  @Output() onSort = new EventEmitter<{ sortBy: string; sortOrder: string }>();

  applySorting(): void {
    this.onSort.emit({ sortBy: this.sortBy, sortOrder: this.sortOrder });
  }
}
