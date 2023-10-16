import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mi-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input()
  currentPage!: number;
  @Input()
  itemsPerPage!: number;
  @Input()
  items!: number;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.items / this.itemsPerPage);
  }
  nextPage() {
    console.log('Next page clicked');
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  previousPage() {
    console.log('Previous page clicked');
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

}
