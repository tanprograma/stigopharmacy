import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  fetching = false;
  filterIcon = faFilter;
  begin: string = '';
  end: string = '';
  commodity: string = '';
  outlet: string = '';
  outlets: (string | undefined)[] = [];
  commodities: (string | undefined)[] = [];
  voucher: string = '';
  clearIcon = faTimes;
  statistics: Stat[] = [];
  displayable: Stat[] = [];

  item: string = '';
  constructor(private inventoryService: InventoryService) {}
  ngOnInit(): void {
    this.setStatistics();
  }
  clear() {
    this.resetFilters();
    this.resetStatistics();
  }
  filter() {
    this.displayable = this.statistics;
    // check voucher
    if (this.voucher) {
      const found = ['dispensed', 'issued', 'received'].find((voucher) => {
        return voucher == this.voucher;
      });
      if (found) {
        this.displayable = this.displayable.filter((i) => {
          return i.voucher == this.voucher;
        });
      }
    }
    // check commodity
    if (this.commodity) {
      const found = this.commodities.find((commodity) => {
        return commodity == this.commodity;
      });
      if (found) {
        this.displayable = this.displayable.filter((i) => {
          return i.commodity == this.commodity;
        });
      }
    }
    // check outlet
    if (this.outlet) {
      const found = this.outlets.find((outlet) => {
        return outlet == this.outlet;
      });
      if (found) {
        this.displayable = this.displayable.filter((i) => {
          return i.outlet == this.outlet;
        });
      }
    }
    // check begin
    if (this.begin) {
      const begin = new Date(this.begin);

      this.displayable = this.displayable.filter((i) => {
        return i.date.getTime() >= begin.getTime();
      });
    }
    // check end
    if (this.end) {
      const end = new Date(this.end);

      this.displayable = this.displayable.filter((i) => {
        return i.date.getTime() >= end.getTime();
      });
    }
  }

  resetFilters() {
    this.outlet = '';
    this.commodity = '';
    this.voucher = '';
    this.begin = '';
    this.end = '';
  }
  resetStatistics() {
    this.displayable = this.statistics;
  }
  setOutlets() {
    this.statistics.forEach((stat) => {
      const found = this.outlets?.find((outlet) => {
        return outlet == stat.outlet;
      });
      if (!found) {
        this.outlets.push(stat.outlet);
      }
    });
  }
  setCommodities() {
    this.statistics.forEach((stat) => {
      const found = this.commodities?.find((commodity) => {
        return commodity == stat.commodity;
      });
      if (!found) {
        this.commodities.push(stat.commodity);
      }
    });
  }
  setStatistics() {
    this.fetching = true;
    this.inventoryService.getInventories().subscribe((inventories) => {
      let raw: Stat[] = [];
      inventories.forEach((inventoryItem) => {
        const dispensed: Stat[] = inventoryItem.dispensed.map((transaction) => {
          return {
            outlet: inventoryItem.outlet,
            client: transaction.client,
            commodity: inventoryItem.commodity,
            date: new Date(transaction.date ?? Date.now()),
            quantity: transaction.quantity,
            voucher: 'dispensed',
          };
        });

        const received: Stat[] = inventoryItem.received.map((transaction) => {
          return {
            client: inventoryItem.outlet,
            outlet: transaction.client,
            commodity: inventoryItem.commodity,
            date: new Date(transaction.date ?? Date.now()),
            quantity: transaction.quantity,
            voucher: 'received',
          };
        });
        const issued: Stat[] = inventoryItem.issued.map((transaction) => {
          return {
            outlet: inventoryItem.outlet,
            client: transaction.client,
            commodity: inventoryItem.commodity,
            date: new Date(transaction.date ?? Date.now()),
            quantity: transaction.quantity,
            voucher: 'issued',
          };
        });
        raw.push(...dispensed, ...received, ...issued);
      });
      this.statistics = raw.sort((a: Stat, b: Stat) => {
        if (a.date.getTime() > b.date.getTime()) return -1;
        if (a.date.getTime() < b.date.getTime()) return 1;
        return 0;
      });
      this.displayable = this.statistics;
      this.fetching = false;
      this.setOutlets();
      this.setCommodities();
    });
  }
}
interface Stat {
  voucher: 'dispensed' | 'received' | 'issued';
  date: Date;
  outlet: string | undefined;
  client: string | undefined;
  commodity: string | undefined;
  quantity: number | undefined;
  unit?: string;
}
