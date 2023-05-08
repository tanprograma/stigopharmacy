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
  loadNavigation(navigation: any) {
    if (!this.storeService.stores.length) {
      this.storeService.getOutlets().subscribe((i) => {
        this.storeService.stores = i;
        this.setX(i, navigation);
        console.log({ stores: i.length });
      });
    }
    return;
  }

  setX(stores: Outlet[], navigation: any) {
    const storesLinks = stores.map((item) => {
      return {
        dropdown_item: item.name,
        dropdown_link: `/outlet/${item.name}`,
      };
    });
    let statLinks = stores.map((item) => {
      return {
        dropdown_item: item.name,
        dropdown_link: `/statistics/${item.name}`,
      };
    });
    statLinks = [
      {
        dropdown_item: 'all',
        dropdown_link: `/statistics/`,
      },
      ...statLinks,
    ];

    navigation.push({
      dropdown_title: 'outlets',
      dropdown_list: storesLinks,
    });
    navigation.push({
      dropdown_title: 'statistics',
      dropdown_list: statLinks,
    });
  }
}
