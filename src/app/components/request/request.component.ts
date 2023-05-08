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

  prescription: Prescription = {
    host: '',
    client: '',
    items: [],
  };

  ngOnInit(): void {
    this.prescription.host = this.outlet;
  }
  constructor(
    private unitService: UnitService,
    private storeService: OutletService,
    private medicineService: MedicinesService,
    private requestService: RequestService
  ) {}

  createRequest() {
    const payload = this.mutatePrescription();
    console.log(payload);
    this.requestService.postRequest(payload).subscribe((i) => {
      console.log(i);
      this.requestService.requests.push(i);
      this.prescription = { host: this.outlet, client: '', items: [] };
    });
  }
  mutatePrescription(): Prescription {
    return {
      host: this.storeService.getStoreID(this.prescription.host),
      client: this.storeService.getStoreID(this.prescription.client),
      items: this.prescription.items.map((i) => {
        let { commodity, unit, issued, requested } = i;
        commodity = this.medicineService.getMedicineID(commodity);
        unit = this.unitService.getUnitID(unit);
        return { commodity, unit, issued, requested };
      }),
    };
  }
}
