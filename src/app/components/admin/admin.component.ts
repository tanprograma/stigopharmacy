import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { MedicinesService } from 'src/app/services/medicines.service';
import { OutletService } from 'src/app/services/outlet.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private medicineService: MedicinesService,
    private unitService: UnitService,
    private storeService: OutletService,
    private clientService: ClientService,
    private inventoryService: InventoryService
  ) {}
  medicines: { name: string }[] = [];
  units: { name: string }[] = [];
  stores: { name: string }[] = [];
  clients: { name: string }[] = [];
  inventories: any = [];
  loading: boolean = false;
  ngOnInit(): void {
    this.getMedicines();
    this.getStores();
  }
  getMedicines() {
    if (this.medicineService.medicines.length) {
      return;
    }
    this.medicineService.getMedicines().subscribe((i) => {
      this.medicineService.medicines = i;
    });
  }
  getMedicineID(medicine: any) {
    return this.medicineService.getMedicineID(medicine);
  }
  getMedicineName(medicine: any) {
    return this.medicineService.getMedicineName(medicine);
  }
  getStoreID(store: any) {
    return this.storeService.getStoreID(store);
  }
  getStoreName(store: any) {
    return this.storeService.getStoreName(store);
  }
  getStores() {
    if (this.storeService.stores.length) {
      return;
    }
    this.storeService.getOutlets().subscribe((i) => {
      this.storeService.stores = i;
    });
  }
  createMedicines(x: FileList) {
    console.log(x);
    const reader = new FileReader();
    reader.readAsText(x[0]);
    reader.onload = (e) => {
      const items = this.processfile(e);
      this.loading = !this.loading;
      this.medicineService.createMedicines(items).subscribe((i) => {
        this.medicines.splice(0, 0, ...i);
        this.loading = !this.loading;
      });
    };
  }
  createUnits(x: FileList) {
    console.log(x);
    const reader = new FileReader();
    reader.readAsText(x[0]);
    reader.onload = (e) => {
      const items = this.processfile(e);
      console.log(items);
      this.loading = !this.loading;
      this.unitService.postUnits(items).subscribe((i) => {
        this.units.splice(0, 0, ...i);
        this.loading = !this.loading;
      });
    };
  }
  createStores(x: FileList) {
    console.log(x);
    const reader = new FileReader();
    reader.readAsText(x[0]);
    reader.onload = (e) => {
      const items = this.processStores(e);
      console.log(items);
      this.loading = !this.loading;
      this.storeService.postOutlets(items).subscribe((i) => {
        const stores = i.map((store) => {
          return { name: store.name };
        });
        this.stores.splice(0, 0, ...stores);
        this.loading = !this.loading;
      });
    };
  }
  createClients(x: FileList) {
    console.log(x);
    const reader = new FileReader();
    reader.readAsText(x[0]);
    reader.onload = (e) => {
      const items = this.processfile(e);
      this.loading = !this.loading;
      this.clientService.postClients(items).subscribe((i) => {
        this.clients.splice(0, 0, ...i);
        this.loading = !this.loading;
      });
    };
  }
  createBegginingStock(x: FileList) {
    console.log(x);
    const reader = new FileReader();
    reader.readAsText(x[0]);
    reader.onload = (e) => {
      const items = this.processStock(e);
      this.loading = !this.loading;
      this.inventoryService.addBeginningStocks(items).subscribe((i) => {
        const mapped = i.map((x) => {
          x.commodity = this.getMedicineName(x.commodity);
          x.outlet = this.getStoreName(x.outlet);
          return x;
        });
        this.inventories.splice(0, 0, ...mapped);
        this.loading = !this.loading;
      });
    };
  }

  processfile(e: any) {
    const list = e.target.result.split('\r\n');
    return this.mapFile(list);
  }
  processStores(e: any) {
    const list = e.target.result.split('\r\n');
    return this.mapStores(list);
  }
  processStock(e: any) {
    const list = e.target.result.split('\r\n');
    return this.mapStock(list);
  }

  mapFile(file: string[]) {
    return file
      .filter((i: string) => {
        return i.length > 0;
      })
      .map((i: string) => {
        return { name: i };
      });
  }
  mapStores(file: string[]) {
    const inner: { name: string; isWarehouse: boolean; isSupplier: boolean }[] =
      [];
    file
      .filter((i: string) => {
        return i.length > 0;
      })
      .forEach((i: string) => {
        const l: any = i.split(',');
        const name = l[0];
        const isWarehouse = l[1] == 'true' || l[1] == 'TRUE' ? true : false;
        const isSupplier = l[2] == 'true' || l[2] == 'TRUE' ? true : false;
        inner.push({ name, isWarehouse, isSupplier });
      });
    return inner;
  }
  mapStock(file: string[]) {
    const inner: { outlet?: string; commodity?: string; beggining: number }[] =
      [];
    file
      .filter((i: string) => {
        return i.length > 0;
      })
      .forEach((i: string) => {
        const l: any = i.split(',');
        const outlet = this.getStoreID(l[0]);
        const commodity = this.getMedicineID(l[1]);
        const beggining = l[2];
        inner.push({ outlet, commodity, beggining });
      });
    return inner;
  }
}
