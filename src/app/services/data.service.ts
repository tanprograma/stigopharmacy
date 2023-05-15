import { Injectable } from '@angular/core';
import { Inventory } from '../inventory';
import { Commodity } from '../commodity';
import { InventoryService } from './inventory.service';
import { Medicine } from '../medicine';
import { Unit } from '../unit';
import { Outlet } from '../outlet';
import { Client } from '../client';
import { OutletService } from './outlet.service';
import { ClientService } from './client.service';
import { CommodityService } from './commodity.service';
import { UnitService } from './unit.service';
import { MedicinesService } from './medicines.service';
import { RequestService } from './request.service';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private storeService: OutletService,
    private commodityService: CommodityService,
    private unitService: UnitService,
    private medicineService: MedicinesService,
    private inventoryService: InventoryService,
    private clientService: ClientService,
    private requestService: RequestService
  ) {}

  loadStoreOptions(outlet: string) {
    this.clientService.loadClients();
    this.requestService.loadRequestsByHost(outlet);
    this.commodityService.loadCommodities();
    this.storeService.loadStores();
    this.unitService.loadUnits();
    this.medicineService.loadMedicines();
  }
}
