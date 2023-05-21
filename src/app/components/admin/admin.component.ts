import { Component, OnInit } from '@angular/core';
import { Prescription } from 'src/app/prescription';
import { ClientService } from 'src/app/services/client.service';
import { CommodityService } from 'src/app/services/commodity.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { MedicinesService } from 'src/app/services/medicines.service';
import { OutletService } from 'src/app/services/outlet.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { UnitService } from 'src/app/services/unit.service';
import { DF } from 'src/app/classes/df';
import { Client } from 'src/app/client';
import { Commodity } from 'src/app/commodity';
import { Unit } from 'src/app/unit';
import { Medicine } from 'src/app/medicine';
import { Outlet } from 'src/app/outlet';
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
    private inventoryService: InventoryService,
    private commodityService: CommodityService,
    private prescriptionService: PrescriptionService
  ) {}
  medicines: { name: string }[] = [];
  units: { name: string }[] = [];
  stores: { name: string }[] = [];
  clients: { name: string }[] = [];
  xclients: Client[] = [];
  xcommodities: Commodity[] = [];
  xunits: Unit[] = [];
  xmedicines: Medicine[] = [];
  xstores: Outlet[] = [];
  inventories: any = [];
  prescription?: Prescription[];
  loading: boolean = false;
  message!: string;
  ngOnInit(): void {
    this.getMedicines();
    this.getStores();
    this.getCommodities();
    this.getClients();
    this.getUnit();
  }
  fetchWait() {
    this.loading = !this.loading;
    this.message = 'fetching resources';
    setTimeout(() => {
      this.loading = !this.loading;
    }, 5000);
  }
  getMedicines() {
    if (this.medicineService.medicines.length) {
      this.xmedicines = this.medicineService.medicines;
      return;
    }
    this.medicineService.getMedicines().subscribe((i) => {
      this.medicineService.medicines = i;
      this.xmedicines = i;
    });
  }
  getUnit() {
    if (this.unitService.units.length) {
      this.xunits = this.unitService.units;
      return;
    }
    this.unitService.getUnits().subscribe((i) => {
      this.unitService.units = i;
      this.xunits = i;
    });
  }
  getStores() {
    if (this.storeService.stores.length) {
      this.xstores = this.storeService.stores;
      return;
    }
    this.storeService.getOutlets().subscribe((i) => {
      this.storeService.stores = i;
      this.xstores = i;
    });
  }
  getClients() {
    if (this.clientService.clients.length) {
      this.xclients = this.clientService.clients;
      return;
    }
    this.clientService.getClients().subscribe((i) => {
      this.clientService.clients = i;
      this.xclients = i;
    });
  }
  getCommodities() {
    if (this.commodityService.commodities.length) {
      this.xcommodities = this.commodityService.commodities;
      return;
    }
    this.commodityService.getCommodities().subscribe((i) => {
      this.commodityService.commodities = i;
      this.xcommodities = i;
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
  getUnitName(store: any) {
    return this.unitService.getUnitName(store);
  }
  getClientName(store: any) {
    return this.clientService.getClientName(store);
  }
  getClientID(store: any) {
    return this.clientService.getClientID(store);
  }

  dispense(data: {
    host: string;
    client: string;
    filelist: FileList;
    date: string;
  }) {
    const reader = new FileReader();
    reader.readAsText(data.filelist[0]);
    reader.onload = (e) => {
      const prescriptions: Prescription[] = this.processPrescription(e, data);

      this.loading = !this.loading;
      this.message = 'uploading prescription';
      console.log({ prescriptions });
      this.loading = !this.loading;
      this.prescriptionService
        .postPrescriptions(prescriptions)
        .subscribe((i) => {
          this.prescription = this.dePopulatePrescription(i);
          this.loading = !this.loading;
        });
    };
  }
  populatePrescription(
    prescription: Prescription,
    data: { host: string; client: string; date: string; filelist: FileList }
  ) {
    prescription.host = this.getStoreID(data.host);
    prescription.client = this.getClientID(data.client);

    prescription.items = prescription.items.map((i) => {
      let { commodity, unit, requested, issued } = i;
      commodity = this.getMedicineID(commodity);
      return {
        commodity,
        unit: this.getCommodityUnit(commodity),
        requested,
        issued,
      };
    });
    return prescription;
  }
  dePopulatePrescription(prescriptions: Prescription[]) {
    return prescriptions.map((prescription) => {
      prescription.host = this.getStoreName(prescription.host);
      prescription.client = this.getClientName(prescription.client);
      prescription.date = this.getDate(prescription.date);
      prescription.items = prescription.items.map((i) => {
        let { commodity, unit, requested, issued } = i;
        commodity = this.getMedicineName(commodity);
        return {
          commodity,
          unit: this.getUnitName(unit),
          requested,
          issued,
        };
      });
      return prescription;
    });
  }
  getDate(date: any) {
    const newDate = new Date(date);
    return `${newDate.getUTCDate}-${
      newDate.getUTCMonth() + 1
    }-${newDate.getUTCFullYear()}`;
  }
  createMedicines(x: FileList) {
    console.log(x);
    const reader = new FileReader();
    reader.readAsText(x[0]);
    reader.onload = (e) => {
      const items = this.processfile(e);
      this.loading = !this.loading;
      this.message = 'uploading medicines';
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
      this.message = 'uploading units';
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
      this.message = 'uploading stores';
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
      this.message = 'uploading clients';
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
      this.message = 'uploading beggining stock';
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
  processPrescription(
    e: any,
    data: {
      host: string;
      client: string;
      filelist: FileList;
      date: string;
    }
  ) {
    const df = new DF(e.target.result, data.date);
    const prescriptions = df.getPrescriptions();

    return this.mapPrescription(prescriptions, data);
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
  mapPrescription(
    prescriptions: Prescription[],
    data: { host: string; client: string; date: string; filelist: FileList }
  ) {
    return prescriptions.map((i) => {
      return this.populatePrescription(i, data);
    });
  }
  getCommodityUnit(commodity?: string) {
    return this.commodityService.getSmallestUnit(commodity);
  }
}
