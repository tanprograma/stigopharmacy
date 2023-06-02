import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Display } from 'src/app/display';
import { Inventory } from 'src/app/inventory';
import { Medicine } from 'src/app/medicine';
import { InventoryService } from 'src/app/services/inventory.service';
import { MedicineService } from 'src/app/services/medicine.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/store';
@Component({
  selector: 'app-statistics-clinic-composition',
  templateUrl: './statistics-clinic-composition.component.html',
  styleUrls: ['./statistics-clinic-composition.component.css'],
})
export class StatisticsClinicCompositionComponent {
  menuState: boolean = false;
  printPDF(e: boolean) {
    if (!e) return;
    window.print();
  }
  @Input() medicines!: Medicine[];
  @Input() cleanedStatistics!: Inventory[];
  @Output() cleanedStatisticsChange = new EventEmitter<Inventory[]>();
  @Input() display!: Display;
  @Input() title!: string;
  @Input() stores: Store[] = [];
  @Input() loading: boolean = false;
  @Input() statistics!: string[];
  @Output() onSetStatistic = new EventEmitter<string>();
  @Output() onGetAll = new EventEmitter<boolean>();
  @Output() onGetDispensed = new EventEmitter<boolean>();
  @Output() onGetIssued = new EventEmitter<boolean>();
  @Output() onGetReceived = new EventEmitter<boolean>();
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
  getHeading(heading: string) {
    return `${heading} statistics`;
  }
  toggleMenu(state: boolean) {
    this.menuState = !this.menuState;
  }

  setStatistic(statistic: any) {
    this.onSetStatistic.emit(statistic);
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
  // getting statistics and views statistic
  getAll(i: boolean) {
    if (i) {
      this.onGetAll.emit(i);
    }
  }
  getDispensed(i: boolean) {
    if (i) {
      this.onGetDispensed.emit(true);
    }
  }
  getReceived(i: boolean) {
    if (i) {
      this.onGetReceived.emit(true);
    }
  }
  getIssued(i: boolean) {
    if (i) {
      this.onGetReceived.emit(true);
    }
  }
}
