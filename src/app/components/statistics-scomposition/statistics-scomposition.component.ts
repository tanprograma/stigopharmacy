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

  @Input() cleanedStatistics!: Inventory[];

  @Input() stores: Store[] = [];
  @Input() loading: boolean = false;
  @Output() onAllTimeFilter = new EventEmitter<boolean>();
  @Output() onFilterStore = new EventEmitter<string>();
  @Output() onFilterDate = new EventEmitter<{
    startDate: Date;
    endDate: Date;
  }>();
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
}
