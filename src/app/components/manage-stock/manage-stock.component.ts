import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/client';
import { Outlet } from 'src/app/outlet';
import { Input, Output, EventEmitter } from '@angular/core';
import { Unit } from 'src/app/unit';
import { Commodity } from 'src/app/commodity';
import { DataService } from 'src/app/services/data.service';
import { UnitService } from 'src/app/services/unit.service';
import { OutletService } from 'src/app/services/outlet.service';
import { CommodityService } from 'src/app/services/commodity.service';
import { Prescription } from 'src/app/prescription';
import { MedicinesService } from 'src/app/services/medicines.service';
import { ClientService } from 'src/app/services/client.service';
import { of, Observable } from 'rxjs';
import { InventoryService } from 'src/app/services/inventory.service';
@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.css'],
})
export class ManageStockComponent implements OnInit {
  constructor(
    private dataService: DataService,
    public unitService: UnitService,
    private commodityService: CommodityService,
    private storeService: OutletService,
    public medicineService: MedicinesService,
    private inventoryService: InventoryService
  ) {}

  medicines: Observable<Client[]> = this.medicineService.getMedicines();
  // xclients?: Client[];
  clients: Observable<Client[]> = this.storeService.getOutlets();
  xclients?: Client[];
  xcommodities?: Commodity[];
  commodities: Observable<Commodity[]> = this.commodityService.getCommodities();
  xunits: Observable<Unit[]> = this.unitService.getUnits();

  @Input() outlet?: string;
  prescription: {
    store: string;

    items: {
      commodity?: string;
      quantity: number;
      inspected?: boolean;
      unit: string;
    }[];
  } = {
    store: '',

    items: [],
  };
  dbUnits?: Unit[];
  units: any;

  getUnits(commodity: string) {
    this.commodities.subscribe((commodities) => {
      let y = [];
      this.xunits.subscribe((xu) => {
        this.units = commodities
          .find((c) => {
            return c.name == this.medicineService.getMedicineID(commodity);
          })
          ?.units.map((u) => {
            return this.unitService.getUnitName(u.name);
          });
      });
    });
  }
  ngOnInit(): void {
    this.commodities.subscribe((i) => {
      this.xcommodities = i;
    });
    this.clients.subscribe((i) => {
      this.xclients = i;
      this.storeService.stores = i;
    });
    this.xunits.subscribe((i) => {
      this.unitService.units = i;
    });
    this.medicines.subscribe((i) => {
      this.medicineService.medicines = i;
    });
  }
  getMedicineName(medicine: any) {
    return this.medicineService.getMedicineName(medicine);
  }
  toNumber(i: string): number {
    return Number(i);
  }
  add(item: {
    commodity?: string;
    quantity: number;
    inspected?: boolean;
    unit: string;
  }) {
    this.prescription.items.push({
      commodity: this.medicineService.getMedicineID(item.commodity),
      quantity: item.quantity,
      inspected: item.inspected,
      unit: item.unit,
    });

    // this.inventoryService.addBeginningStock(this.prescription);
  }
  addStock() {
    const store = this.storeService.getStoreID(this.prescription.store);
    const item = {
      store,
      payload: this.prescription.items.map((i) => {
        return { commodity: i.commodity, quantity: i.quantity };
      }),
    };
    console.log({ item });

    this.inventoryService.addBeginningStock(item).subscribe((i) => {
      console.log({ beggining: i });
    });
  }
}
