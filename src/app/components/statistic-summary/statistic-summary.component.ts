import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/inventory';
import { Medicine } from 'src/app/medicine';
import { InventoryService } from 'src/app/services/inventory.service';
import { MedicineService } from 'src/app/services/medicine.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/store';
@Component({
  selector: 'app-statistic-summary',
  templateUrl: './statistic-summary.component.html',
  styleUrls: ['./statistic-summary.component.css'],
})
export class StatisticSummaryComponent implements OnInit {
  menuState: boolean = false;
  printPDF(e: boolean) {
    if (!e) return;
    window.print();
  }
  interval: any;
  rawStatistics: Inventory[] = [];
  cleanedStatistics: Inventory[] = [];
  inventories: Inventory[] = [];
  filteredInventories: Inventory[] = [];
  medicines: Medicine[] = [];
  stores: Store[] = [];
  loading: boolean = false;
  constructor(
    private inventoryService: InventoryService,
    private medicineService: MedicineService,
    private storeService: StoreService
  ) {}
  ngOnInit(): void {
    this.getResources();
    this.initialize();
  }
  toggleMenu(state: boolean) {
    this.menuState = !this.menuState;
  }
  getStores() {
    this.storeService.getStores().subscribe((i) => {
      this.stores = i;
    });
  }
  getMedicines() {
    this.medicineService.getMedicines().subscribe((i) => {
      this.medicines = i;
    });
  }
  getInventory() {
    this.inventoryService.getInventories().subscribe((i) => {
      this.inventories = i;
    });
  }
  getResources() {
    this.getInventory();
    this.getMedicines();
    this.getStores();
  }

  initialize() {
    this.loading = true;
    this.interval = setInterval(() => {
      this.checkStatus();
    }, 2);
  }
  checkStatus() {
    const isLoading: boolean = !(
      this.medicines.length > 0 &&
      this.inventories.length > 0 &&
      this.stores.length > 0
    );
    if (isLoading) return;
    this.setSummary();
    this.loading = false;
    clearInterval(this.interval);
  }
  setSummary() {
    this.cleanedStatistics = this.rawStatistics =
      this.inventoryService.getSummary(this.medicines, this.inventories);
    console.log({ summary: this.rawStatistics });
  }
  allTimeFilter(i: boolean) {
    if (i) {
      this.cleanedStatistics = this.rawStatistics;
      console.log({ rawStat: this.rawStatistics });
    }
  }
  filterStore(store: any) {
    if (store == 'ALL') {
      this.setSummary();
      return;
    }

    this.cleanedStatistics = this.rawStatistics = this.inventories.filter(
      (i) => {
        return i.outlet == store;
      }
    );
  }

  filterDate(date: { startDate: Date; endDate: Date }) {
    console.log({ filterDate: true, date });
    this.cleanedStatistics = [...this.rawStatistics].map((i) => {
      i.dispensed = this.searchDates(date, i.dispensed);
      i.received = this.searchDates(date, i.received);
      i.issued = this.searchDates(date, i.issued);
      return i;
    });
  }
  searchDates(date: { startDate: Date; endDate: Date }, item: any) {
    return item.filter((i: any) => {
      return (
        i.date >= date.startDate.valueOf() && i.date <= date.endDate.valueOf()
      );
    });
  }
}
