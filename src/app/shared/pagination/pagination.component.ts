import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() totalPages!: number; 
  @Input() currentPage!: number; 
  @Output() onPageChange = new EventEmitter<number>(); 

  get middlePages(): number[] {
    // Calculate middle pages to display
    const range = [];
    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(this.totalPages - 1, this.currentPage + 1);
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.onPageChange.emit(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.onPageChange.emit(this.currentPage + 1);
    }
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.onPageChange.emit(page);
    }
  }
}
