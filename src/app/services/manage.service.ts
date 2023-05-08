import { Injectable } from '@angular/core';
import { MedicinesService } from './medicines.service';
import { UnitService } from './unit.service';
import { OutletService } from './outlet.service';
import { CommodityService } from './commodity.service';
import { ClientService } from './client.service';
import { Unit } from '../unit';
import { Commodity } from '../commodity';
import { Client } from '../client';
import { Outlet } from '../outlet';
import { Medicine } from '../medicine';
@Injectable({
  providedIn: 'root',
})
export class ManageService {
  units: Unit[] = [];
  medicines: Medicine[] = [];
  commodities: Commodity[] = [];
  clients: Client[] = [];
  stores: Outlet[] = [];
  getResources() {
    this.getUnits();
    this.getClients();
    this.getStores();
    this.getMedicines();
    this.getCommodities();
  }
  getUnits() {
    this.unitService.getUnits().subscribe((units) => {
      this.units = units;
    });
  }
  getStores() {
    this.storeService.getOutlets().subscribe((outlets) => {
      this.stores = outlets;
    });
  }
  getClients() {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }
  getCommodities() {
    this.commodityService.getCommodities().subscribe((commodities) => {
      this.commodities = commodities;
    });
  }
  getMedicines() {
    this.medicineService.getMedicines().subscribe((medicines) => {
      this.medicines = medicines;
    });
  }
  constructor(
    private unitService: UnitService,
    private medicineService: MedicinesService,
    private clientService: ClientService,
    private storeService: OutletService,
    private commodityService: CommodityService
  ) {}
}
