import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicine } from 'src/app/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { Store } from 'src/app/store';
import { StoreService } from 'src/app/services/store.service';
import { Inventory } from 'src/app/inventory';
import { InventoryService } from 'src/app/services/inventory.service';
import { Display } from 'src/app/display';
@Component({
  selector: 'app-statistic-clinic-summary',
  templateUrl: './statistic-clinic-summary.component.html',
  styleUrls: ['./statistic-clinic-summary.component.css'],
})
export class StatisticClinicSummaryComponent implements OnInit {
  clinic: string = '';
  // constructor(private route: ActivatedRoute) {}
  // ngOnInit(): void {
  //   this.getClinic();
  // }
  // getClinic() {
  //   this.route.params.subscribe((p) => {
  //     this.clinic = p['outlet'];
  //     console.log(this.clinic);
  //   });
  // }
  menuState: boolean = false;
  statistic: string = '';
  statistics: string[] = ['all', 'dispensed', 'received', 'issued'];
  display: Display = {
    dispensed: true,
    issued: true,
    received: true,
    available: true,
  };
  printPDF(e: boolean) {
    if (!e) return;
    window.print();
  }
  interval: any;
  rawStatistics: Inventory[] = [];
  cleanedStatistics: any = [];
  filterStats: Inventory[] = [];
  inventories: Inventory[] = [];
  filteredInventories: Inventory[] = [];
  medicines: Medicine[] = [];
  stores: Store[] = [];
  loading: boolean = false;
  constructor(
    private inventoryService: InventoryService,
    private medicineService: MedicineService,
    private storeService: StoreService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.statistic = this.statistics[0];
    this.watchRoute();
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
  // filter by quantity
  clearQuantityFilter(run: boolean) {
    if (!run) return;
    this.cleanedStatistics = this.rawStatistics;
  }
  getlt(run: boolean) {
    if (!run) return;
    if (this.statistic == this.statistics[1]) {
      this.cleanedStatistics = this.rawStatistics.filter((i) => {
        const sum = this.reduceSum(i.dispensed);
        return sum <= 0;
      });
      this.filterStats = this.rawStatistics.filter((i) => {
        const sum = this.reduceSum(i.dispensed);
        return sum <= 0;
      });
      return;
    }
    if (this.statistic == this.statistics[2]) {
      this.cleanedStatistics = this.rawStatistics.filter((i) => {
        const sum = this.reduceSum(i.received);
        return sum <= 0;
      });
      this.filterStats = this.rawStatistics.filter((i) => {
        const sum = this.reduceSum(i.received);
        return sum <= 0;
      });
      return;
    }
    if (this.statistic == this.statistics[3]) {
      this.cleanedStatistics = this.rawStatistics.filter((i) => {
        const sum = this.reduceSum(i.issued);
        return sum <= 0;
      });
      this.filterStats = this.rawStatistics.filter((i) => {
        const sum = this.reduceSum(i.issued);
        return sum <= 0;
      });
      return;
    }
    this.cleanedStatistics = this.rawStatistics.filter((i) => {
      const dispensed = this.reduceSum(i.dispensed);
      const received = this.reduceSum(i.received);
      const issued = this.reduceSum(i.issued);
      const beginning = i.beginning;
      const sum = beginning + received - dispensed - issued;
      return sum <= 0;
    });
    this.filterStats = this.rawStatistics.filter((i) => {
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
    if (this.statistic == this.statistics[1]) {
      this.cleanedStatistics = this.rawStatistics.filter((i) => {
        const sum = this.reduceSum(i.dispensed);
        return sum > 0;
      });
      this.filterStats = this.rawStatistics.filter((i) => {
        const sum = this.reduceSum(i.dispensed);
        return sum > 0;
      });
      return;
    }
    if (this.statistic == this.statistics[2]) {
      this.cleanedStatistics = this.rawStatistics.filter((i) => {
        const sum = this.reduceSum(i.received);
        return sum > 0;
      });
      this.filterStats = this.rawStatistics.filter((i) => {
        const sum = this.reduceSum(i.received);
        return sum > 0;
      });
      return;
    }
    if (this.statistic == this.statistics[3]) {
      this.cleanedStatistics = this.rawStatistics.filter((i) => {
        const sum = this.reduceSum(i.issued);
        return sum > 0;
      });
      this.filterStats = this.rawStatistics.filter((i) => {
        const sum = this.reduceSum(i.issued);
        return sum > 0;
      });
      return;
    }
    this.cleanedStatistics = this.rawStatistics.filter((i) => {
      const dispensed = this.reduceSum(i.dispensed);
      const received = this.reduceSum(i.received);
      const issued = this.reduceSum(i.issued);
      const beginning = i.beginning;
      const sum = beginning + received - dispensed - issued;
      return sum > 0;
    });
    this.filterStats = this.rawStatistics.filter((i) => {
      const dispensed = this.reduceSum(i.dispensed);
      const received = this.reduceSum(i.received);
      const issued = this.reduceSum(i.issued);
      const beginning = i.beginning;
      const sum = beginning + received - dispensed - issued;
      return sum > 0;
    });
  }
  // end of filter by date
  // filter by statistic
  setStatistic(statistic: any) {
    if (statistic == this.statistics[1]) {
      this.statistic = statistic;
      this.filterDispensed();
      return;
    }
    if (statistic == this.statistics[2]) {
      this.statistic = statistic;
      this.filterReceived();
      return;
    }
    if (statistic == this.statistics[3]) {
      this.statistic = statistic;
      this.filterIssued();
      return;
    }
    this.filterAll();
  }
  // end of filter by statistic
  // filter by date
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
  // setQantity(statistic: any) {
  //   if (statistic == this.statistics[1]) {
  //     this.filterDispensed();
  //     return;
  //   }
  //   if (statistic == this.statistics[2]) {
  //     this.filterReceived();
  //     return;
  //   }
  //   if (statistic == this.statistics[3]) {
  //     this.filterIssued();
  //     return;
  //   }
  //   this.filterAll();
  // }

  filterAll() {
    this.display = {
      dispensed: true,
      issued: true,
      received: true,
      available: true,
    };
  }
  filterDispensed() {
    this.display = {
      dispensed: true,
      issued: false,
      received: false,
      available: false,
    };
  }
  filterReceived() {
    this.display = {
      dispensed: false,
      issued: false,
      received: true,
      available: false,
    };
  }
  filterIssued() {
    this.display = {
      dispensed: false,
      issued: true,
      received: false,
      available: false,
    };
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
  getInventory(store: any) {
    this.inventoryService.getInventoryByStore(store).subscribe((i) => {
      this.inventories = i;
      // console.log({ store: store, inventories: this.inventories });
      this.setSummary();
    });
  }
  watchRoute() {
    this.route.params.subscribe((p) => {
      const store = p['outlet'];
      // console.log({ clinic: store });
      this.clinic = store;
      this.getResources(store);
      this.initialize();
    });
  }
  getResources(store: any) {
    this.getInventory(store);
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
    this.cleanedStatistics = this.inventoryService.getSummary(
      this.medicines,
      this.inventories
    );
    this.filterStats = this.inventoryService.getSummary(
      this.medicines,
      this.inventories
    );

    this.rawStatistics = this.inventoryService.getSummary(
      this.medicines,
      this.inventories
    );
  }

  searchDates(date: { startDate: Date; endDate: Date }, item: any) {
    return item.filter((i: any) => {
      return (
        i.date >= date.startDate.valueOf() && i.date <= date.endDate.valueOf()
      );
    });
  }
  // handling change of views
  getAll(i: boolean) {
    if (i) {
      console.log('all');
    }
  }
  getDispensed(i: boolean) {
    if (i) {
      console.log('dispensed');
    }
  }
  getReceived(i: boolean) {
    if (i) {
      console.log('received');
    }
  }
  getIssued(i: boolean) {
    if (i) {
      console.log('issued');
    }
  }
  reduceSum(arr: any) {
    return arr
      .map((i: any) => {
        return i.quantity;
      })
      .reduce((a: number, b: number) => {
        return a + b;
      }, 0);
  }
}
