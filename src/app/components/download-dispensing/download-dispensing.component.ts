import { Component, OnInit } from '@angular/core';
import { DispensedSummary } from 'src/app/dispensedsummary';
import { Outlet } from 'src/app/outlet';
import { Prescription } from 'src/app/prescription';
import { CommodityService } from 'src/app/services/commodity.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { MedicinesService } from 'src/app/services/medicines.service';
import { OutletService } from 'src/app/services/outlet.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-download-dispensing',
  templateUrl: './download-dispensing.component.html',
  styleUrls: ['./download-dispensing.component.css'],
})
export class DownloadDispensingComponent implements OnInit {
  clinic = '';
  generated: boolean = false;
  date: string = '';
  report_date!: string;
  print: boolean = false;
  stores: Outlet[] = [];
  dispensed: any = [];
  loading: boolean = false;
  message!: string;
  constructor(
    private medicineService: MedicinesService,
    private unitService: UnitService,
    private inventoryService: InventoryService,
    private storeService: OutletService,
    private commodityService: CommodityService
  ) {}
  ngOnInit(): void {
    this.getResources();
  }
  setDate() {
    const date = new Date(this.date);
    this.report_date = `${date.getUTCDate()}-${
      date.getUTCMonth() + 1
    }-${date.getUTCFullYear()}`;
  }
  clear() {
    this.date = '';
    this.clinic = '';
    this.generated = false;
  }
  downloadCSV() {
    this.print = !this.print;

    console.log('download csv');
  }
  downloadPDF() {
    console.log('download pdf');
    window.print();
  }
  search() {
    if (!this.date.length) return;
    this.setDate();
    const store = this.storeService.getStoreID(this.clinic);
    const date = new Date(new Date(this.date).toLocaleDateString()).valueOf();
    this.inventoryService.getDispensed({ store, date }).subscribe((i) => {
      this.dispensed = this.getReduced(i);
    });
    console.log(this.clinic);
    console.log(date);
    this.generated = true;
  }
  getReduced(items: DispensedSummary[]) {
    const dispensed: any = [];
    items.forEach((item) => {
      const sum = item.dispensed
        .map((x) => {
          const quantity = x.quantity;
          const largestUnit = this.commodityService.getLargestUnit(
            item.commodity
          );
          const divider =
            this.commodityService.getUnitValue(item.commodity, largestUnit) ||
            1;
          const multiplier = this.commodityService.getUnitValue(
            item.commodity,
            x.unit
          );
          return (quantity * (multiplier || 1)) / divider;
        })
        .reduce((a: number, b: number) => {
          return a + b;
        }, 0);
      dispensed.push({
        commodity: this.getMedicineName(item.commodity),
        dispensed: sum,
        unit: this.getUnitName(
          this.commodityService.getLargestUnit(item.commodity)
        ),
      });
    });
    return dispensed.sort((a: any, b: any) => {
      if (a.commodity > b.commodity) {
        return 1;
      }
      if (a.commodity < b.commodity) {
        return 1;
      }
      return 0;
    });
  }
  getMedicineName(commodity?: string) {
    return this.medicineService.getMedicineName(commodity);
  }
  getUnitName(commodity?: string) {
    return this.unitService.getUnitName(commodity);
  }
  getMedicines() {
    this.medicineService.getMedicines().subscribe((i) => {
      this.medicineService.medicines = i;
    });
  }
  getCommodities() {
    this.commodityService.getCommodities().subscribe((i) => {
      this.commodityService.commodities = i;
    });
  }
  getUnits() {
    this.unitService.getUnits().subscribe((i) => {
      this.unitService.units = i;
    });
  }
  getStores() {
    this.loading = !this.loading;
    this.message = 'initializing resources';
    this.storeService.getOutlets().subscribe((i) => {
      this.storeService.stores = i;
      this.stores = i.filter((x) => {
        return !x.isSupplier == true;
      });
      this.loading = !this.loading;
    });
  }
  getResources() {
    this.getCommodities();
    this.getUnits();
    this.getMedicines();
    this.getStores();
  }
}
