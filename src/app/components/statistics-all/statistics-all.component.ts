import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/inventory';
import { InventoryService } from 'src/app/services/inventory.service';
import { Observable, of } from 'rxjs';
import { Medicine } from 'src/app/medicine';
import { Unit } from 'src/app/unit';
import { Outlet } from 'src/app/outlet';
import { MedicinesService } from 'src/app/services/medicines.service';
import { UnitService } from 'src/app/services/unit.service';
import { OutletService } from 'src/app/services/outlet.service';
import { CommodityService } from 'src/app/services/commodity.service';
import { Commodity } from 'src/app/commodity';
import { StatisticsService } from 'src/app/service/statistics.service';
@Component({
  selector: 'app-statistics-all',
  templateUrl: './statistics-all.component.html',
  styleUrls: ['./statistics-all.component.css'],
})
export class StatisticsAllComponent implements OnInit {
  statistics: Inventory[] = [];
  medicines: Medicine[] = [];
  units: Unit[] = [];
  commodities: Commodity[] = [];
  stores: Outlet[] = [];
  nightmode: boolean = false;
  constructor(
    private inventoryService: InventoryService,
    private medicineService: MedicinesService,
    private unitService: UnitService,
    private storeService: OutletService,
    private commodityService: CommodityService,
    private statisticsService: StatisticsService
  ) {}
  ngOnInit(): void {
    this.getInventoryAndMedicines();
    this.getCommodities();
    this.getStores();
    this.getUnits();
  }
  toggleNightMode() {
    this.nightmode = !this.nightmode;
  }
  reduceQuantities(
    commodity: any,
    list: {
      transaction: string;
      unit: string;
      quantity: number;
      _id?: string;
    }[]
  ) {
    const divider = this.getDivider(commodity);
    let reduced;
    if (!list.length) {
      return 0;
    }
    reduced = list
      .map((i) => {
        const multiplier = this.getMultiplier(commodity, i.unit);
        return (multiplier || 1) * i.quantity;
      })
      .reduce((a: number, b: number) => {
        return a + b;
      }, 0);
    console.log({ reduced: reduced / divider });
    return reduced / divider;
  }
  getMultiplier(medicine: string, unit: string) {
    return this.commodityService.commodities
      .find((i) => {
        return i.name == medicine;
      })
      ?.units.find((i) => {
        return i.name == unit;
      })?.quantity;
  }
  getDivider(medicine: string) {
    const quantities = this.commodityService.commodities
      .find((i) => {
        return i.name == medicine;
      })
      ?.units.map((i) => {
        return i.quantity;
      });
    return Math.max(...(quantities || []));
  }
  getMaxUnit(medicine: string) {
    const commodity = this.commodityService.commodities.find((i) => {
      return i.name == medicine;
    });

    const unitsValues = commodity?.units.map((i) => {
      return i.quantity;
    });

    const maxUnitValue = Math.max(...(unitsValues || []));

    const unit = commodity?.units.find((i) => {
      return i.quantity == maxUnitValue;
    })?.name;

    return this.getUnitName(unit || '');
  }
  getMedicineName(medicine: string) {
    return this.medicineService.getMedicineName(medicine);
  }
  getStoreName(medicine: string) {
    return this.storeService.getStoreName(medicine);
  }
  getUnitName(medicine: string) {
    return this.unitService.getUnitName(medicine);
  }

  getStores() {
    if (!this.storeService.stores.length) {
      this.storeService.getOutlets().subscribe((stores) => {
        this.stores = stores;
        this.storeService.stores = stores;
      });
    }
  }
  getCommodities() {
    if (!this.commodityService.commodities.length) {
      this.commodityService.getCommodities().subscribe((commodities) => {
        this.commodities = commodities;
        this.commodityService.commodities = commodities;
      });
    }
  }
  getInventoryAndMedicines() {
    if (!this.statisticsService.statistics.length) {
      this.medicineService.getMedicines().subscribe((medicines) => {
        this.medicines = medicines;
        this.medicineService.medicines = medicines;
        console.log({ medicines });
        this.inventoryService.getInventories().subscribe((inventory) => {
          console.log({ inventory, length: inventory.length });

          medicines.forEach((medicine) => {
            const rawInventories = inventory.filter((i) => {
              return i.commodity == medicine._id;
            });
            const cleanedInventory: Inventory = {
              commodity: medicine._id,
              beginning: 0,
              dispensed: [],
              received: [],
              issued: [],
            };
            rawInventories.forEach((i) => {
              cleanedInventory.beginning += i.beginning;
              cleanedInventory.dispensed = [
                ...cleanedInventory.dispensed,
                ...i.dispensed,
              ];
              cleanedInventory.received = [
                ...cleanedInventory.received,
                ...i.received,
              ];
              cleanedInventory.issued = [
                ...cleanedInventory.issued,
                ...i.issued,
              ];
            });

            this.statistics.push(cleanedInventory);
          });
          console.log({
            statistics: this.statistics,
            length: this.statistics.length,
          });
        });
      });
      return;
    }
    this.statistics = this.statisticsService.statistics;
  }
  getUnits() {
    if (!this.unitService.units.length) {
      this.unitService.getUnits().subscribe((units) => {
        this.units = units;
        this.unitService.units = units;
      });
    }
  }
}
