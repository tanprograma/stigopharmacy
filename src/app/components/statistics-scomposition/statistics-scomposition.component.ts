import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Inventory } from 'src/app/inventory';
import { Medicine } from 'src/app/medicine';
import { InventoryService } from 'src/app/services/inventory.service';
import { MedicineService } from 'src/app/services/medicine.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/store';

@Component({
  selector: 'app-statistics-scomposition',
  templateUrl: './statistics-scomposition.component.html',
  styleUrls: ['./statistics-scomposition.component.css'],
})
export class StatisticsScompositionComponent implements OnInit {
  menuState: boolean = false;
  printPDF(e: boolean) {
    if (!e) return;
    window.print();
  }
  @Input() medicines!: Medicine[];
  @Input() cleanedStatistics!: Inventory[];
  @Input() statistics!: string[];
  @Input() stores: Store[] = [];
  @Input() loading: boolean = false;
  @Output() onAllTimeFilter = new EventEmitter<boolean>();
  @Output() onFilterStore = new EventEmitter<string>();
  @Output() onFilterDate = new EventEmitter<{
    startDate: Date;
    endDate: Date;
  }>();
  @Output() onGetLt = new EventEmitter<boolean>();
  @Output() onGetGt = new EventEmitter<boolean>();
  @Output() onClearQuantityFilter = new EventEmitter<boolean>();
  @Output() onProductFilter = new EventEmitter<string>();
  @Output() onClearMedicineFilter = new EventEmitter<boolean>();
  constructor() {}
  ngOnInit(): void {}
  toggleMenu(state: boolean) {
    this.menuState = !this.menuState;
  }

  allTimeFilter(i: boolean) {
    this.onAllTimeFilter.emit(i);
  }
  filterStore(store: any) {
    this.onFilterStore.emit(store);
  }

  filterDate(date: { startDate: Date; endDate: Date }) {
    this.onFilterDate.emit(date);
  }
  // filtering product
  filterProduct(item: string) {
    this.onProductFilter.emit(item);
  }
  clearProductFilter(i: boolean) {
    if (!i) return;
    this.onClearMedicineFilter.emit(i);
  }
  // end of filter product
  // start of quantity filters
  clearQuantityFilter(run: boolean) {
    this.onClearQuantityFilter.emit(true);
  }
  getGt(run: boolean) {
    if (!run) return;
    this.onGetGt.emit(true);
  }
  getLt(run: boolean) {
    if (!run) return;
    this.onGetLt.emit(true);
  }
  // end of quantity filters
}
