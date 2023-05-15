import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { MedicinesService } from 'src/app/services/medicines.service';
import { OutletService } from 'src/app/services/outlet.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(
    private medicineService: MedicinesService,
    private unitService: UnitService,
    private storeService: OutletService,
    private clientService: ClientService
  ) {}
  medicines: { name: string }[] = [];
  units: { name: string }[] = [];
  stores: { name: string }[] = [];
  clients: { name: string }[] = [];
  createMedicines(x: FileList) {
    console.log(x);
    const reader = new FileReader();
    reader.readAsText(x[0]);
    reader.onload = (e) => {
      const items = this.processfile(e);

      this.medicineService.createMedicines(items).subscribe((i) => {
        this.medicines = i;
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

      this.unitService.postUnits(items).subscribe((i) => {
        this.units = i;
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

      this.storeService.postOutlets(items).subscribe((i) => {
        this.stores = i.map((store) => {
          return { name: store.name };
        });
      });
    };
  }
  createClients(x: FileList) {
    console.log(x);
    const reader = new FileReader();
    reader.readAsText(x[0]);
    reader.onload = (e) => {
      const items = this.processfile(e);

      this.clientService.postClients(items).subscribe((i) => {
        this.clients = i;
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
}
