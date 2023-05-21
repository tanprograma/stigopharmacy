import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/client';
import { Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Prescription } from 'src/app/prescription';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { CommodityService } from 'src/app/services/commodity.service';
import { UnitService } from 'src/app/services/unit.service';
import { OutletService } from 'src/app/services/outlet.service';

import { MedicinesService } from 'src/app/services/medicines.service';
import { Medicine } from 'src/app/medicine';
import { Commodity } from 'src/app/commodity';
@Component({
  selector: 'app-dispense',
  templateUrl: './dispense.component.html',
  styleUrls: ['./dispense.component.css'],
})
export class DispenseComponent implements OnInit {
  @Input() outlet!: string;
  created: Prescription[] = [];
  loading: boolean = false;
  prescription: Prescription = {
    host: '',
    date: '',
    client: '',
    items: [],
  };

  ngOnInit(): void {
    this.prescription.host = this.outlet;
    console.log({ outlet: this.outlet });
    this.clientService.getClients().subscribe((i) => {
      this.clientService.clients = i;
    });
    this.storeService.getOutlets().subscribe((i) => {
      this.storeService.stores = i;
    });
  }
  constructor(
    private clientService: ClientService,
    private commodityService: CommodityService,
    private unitService: UnitService,
    private storeService: OutletService,
    private medicineService: MedicinesService,
    private prescriptionService: PrescriptionService
  ) {}

  createDispensed() {
    const payload = this.mutatePrescription();
    console.log(payload);
    this.loading = !this.loading;
    this.prescriptionService.postPrescription(payload).subscribe((i) => {
      console.log(i);
      this.created.splice(0, 0, i);
      this.loading = !this.loading;
      this.prescription = {
        host: this.outlet,
        client: '',
        date: '',
        items: [],
      };
    });
    // this.prescription = {
    //   host: '',
    //   client: '',
    //   commodities: [],
    // };
  }
  mutatePrescription(): Prescription {
    const date = new Date(this.prescription.date).valueOf();
    const now = Date.now();
    return {
      host: this.storeService.getStoreID(this.prescription.host),
      date: date ? date : now,
      client: this.clientService.getClientID(this.prescription.client),
      items: this.prescription.items.map((i) => {
        let { commodity, unit, issued, requested } = i;
        commodity = this.medicineService.getMedicineID(commodity);
        unit = this.unitService.getUnitID(unit);
        return { commodity, unit, issued, requested };
      }),
    };
  }
  getClientName(client?: string) {
    return this.clientService.getClientName(client);
  }
  getStoreName(store?: string) {
    return this.storeService.getStoreName(store);
  }
  getDate(datestring: any) {
    const date = new Date(datestring);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }
}
