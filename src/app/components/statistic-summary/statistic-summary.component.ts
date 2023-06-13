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
  filterStats: any = [];
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
  // start filter by product
  filterProduct(item: any) {
    this.cleanedStatistics = this.filterStats.filter((i: any) => {
      return i.commodity == item;
    });
  }
  clearProductFilter(item: any) {
    this.cleanedStatistics = this.filterStats;
  }
  // filter by product
  // filter by date
  searchDates(date: { startDate: Date; endDate: Date }, item: any) {
    return item.filter((i: any) => {
      return (
        i.date >= date.startDate.valueOf() && i.date <= date.endDate.valueOf()
      );
    });
  }
  setTime(dates: { startDate: Date; endDate: Date }) {
    this.cleanedStatistics = this.filterDates(dates);
    this.filterStats = this.filterDates(dates);
    // console.log({ statLength: this.cleanedStatistics });
  }
  filterDates(date: { startDate: Date; endDate: Date }) {
    const priori = [...this.rawStatistics];
    const posteriori = priori.map((i) => {
      let {
        active,
        commodity,
        outlet,
        unit,
        unit_value,
        dispensed,
        issued,
        isWarehouse,
        received,
        beginning,
        inventory_level,
        sn,
      } = i;
      dispensed = this.searchDates(date, i.dispensed);
      received = this.searchDates(date, i.received);
      issued = this.searchDates(date, i.issued);

      return {
        active,
        commodity,
        outlet,
        unit,
        unit_value,
        dispensed,
        issued,
        isWarehouse,
        received,
        beginning,
        inventory_level,
        sn,
      };
    });
    console.log({ raw: this.rawStatistics });
    console.log({ priori, posteriori });
    return posteriori;
  }

  // end of filter by date
  // filtering quantitis
  reduceSum(arr: any) {
    return arr
      .map((i: any) => {
        return i.quantity;
      })
      .reduce((a: number, b: number) => {
        return a + b;
      }, 0);
  }
  getlt(run: boolean) {
    if (!run) return;
    this.cleanedStatistics = this.rawStatistics.filter((i) => {
      const dispensed = this.reduceSum(i.dispensed);
      const received = this.reduceSum(i.received);
      const issued = this.reduceSum(i.issued);
      const beginning = i.beginning;
      const sum = beginning + received - dispensed - issued;
      return sum <= 0;
    });
  }
  getgt(run: boolean) {
    if (!run) return;
    this.cleanedStatistics = this.rawStatistics.filter((i) => {
      const dispensed = this.reduceSum(i.dispensed);
      const received = this.reduceSum(i.received);
      const issued = this.reduceSum(i.issued);
      const beginning = i.beginning;
      const sum = beginning + received - dispensed - issued;
      return sum > 0;
    });
  }
  clearQuantityFilter(clear: boolean) {
    if (!clear) return;
    this.cleanedStatistics = this.rawStatistics;
  }
  //  end of quantities filters
  toggleMenu(state: boolean) {
    this.menuState = !this.menuState;
  }
  getStores() {
    this.storeService.getStores().subscribe((i) => {
      this.stores = i;
      this.storeService.stores = i;
    });
  }
  getMedicines() {
    this.medicineService.getMedicines().subscribe((i) => {
      this.medicines = i;
      this.medicineService.medicines = i;
    });
  }
  getInventory() {
    this.inventoryService.getInventories().subscribe((i) => {
      this.inventories = i;
      this.inventoryService.inventories = i;
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
    this.rawStatistics = this.inventoryService.getSummary(
      this.medicines,
      this.inventories
    );
    this.cleanedStatistics = this.inventoryService.getSummary(
      this.medicines,
      this.inventories
    );
    this.filterStats = this.inventoryService.getSummary(
      this.medicines,
      this.inventories
    );
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
}
