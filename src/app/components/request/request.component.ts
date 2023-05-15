import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { MedicinesService } from 'src/app/services/medicines.service';
import { Input } from '@angular/core';

import { Prescription } from 'src/app/prescription';
import { OutletService } from 'src/app/services/outlet.service';

import { UnitService } from 'src/app/services/unit.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent {
  @Input() outlet!: string;
  created: Prescription[] = [];
  prescription: Prescription = {
    host: '',
    date: '',
    client: '',
    items: [],
  };

  ngOnInit(): void {
    this.prescription.client = this.outlet;
    this.storeService.getOutlets().subscribe((i) => {
      this.storeService.stores = i;
    });
  }
  constructor(
    private unitService: UnitService,
    private storeService: OutletService,
    private medicineService: MedicinesService,
    private requestService: RequestService
  ) {}

  createRequest() {
    const payload = this.mutatePrescription();

    this.requestService.postRequest(payload).subscribe((i) => {
      console.log(i);
      this.created.push(i);
      this.requestService.requests.push(i);
      this.prescription = {
        client: this.outlet,
        host: '',
        date: '',
        items: [],
      };
    });
  }
  mutatePrescription(): Prescription {
    const date = new Date(this.prescription.date).valueOf();
    const now = new Date().valueOf();
    return {
      host: this.storeService.getStoreID(this.prescription.host),
      date: date ? date : now,
      client: this.storeService.getStoreID(this.prescription.client),
      items: this.prescription.items.map((i) => {
        let { commodity, unit, requested } = i;
        commodity = this.medicineService.getMedicineID(commodity);
        unit = this.unitService.getUnitID(unit);
        return { commodity, unit, requested, issued: 0 };
      }),
    };
  }

  getStoreName(store: string) {
    return this.storeService.getStoreName(store);
  }
  getDate(datestring: string) {
    const date = new Date(datestring);
    const day = date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
