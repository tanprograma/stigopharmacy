import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Unit } from 'src/app/unit';
import { Commodity } from 'src/app/commodity';
import { Rquest } from 'src/app/request';
import { Outlet } from 'src/app/outlet';
import { Prescription } from 'src/app/prescription';
import { OutletService } from 'src/app/services/outlet.service';
import { MedicinesService } from 'src/app/services/medicines.service';
import { UnitService } from 'src/app/services/unit.service';
import { RequestService } from 'src/app/services/request.service';
import { Observable, of } from 'rxjs';
import { Medicine } from 'src/app/medicine';
@Component({
  selector: 'app-request-item',
  templateUrl: './request-item.component.html',
  styleUrls: ['./request-item.component.css'],
})
export class RequestItemComponent implements OnInit {
  constructor(
    public storeService: OutletService,
    public medicineService: MedicinesService,
    public unitService: UnitService,
    private requestService: RequestService
  ) {}
  requests: { inspected: boolean; request: Prescription }[] = [];
  loaderMessage: string = 'fetching requests';
  @Input() host!: string;
  @Output() onIssue = new EventEmitter<{
    id: any;
    req: {
      inspected?: boolean;
      commodity?: string;
      issued: number;
      requested: number;
      unit?: string;
    }[];
  }>();

  ngOnInit(): void {
    this.getRequests();
    this.getMedicines();
    this.getUnits();
  }
  getMedicineName(medicineID?: string) {
    return this.medicineService.getMedicineName(medicineID);
  }
  getStoreName(storeID?: string) {
    return this.storeService.getStoreName(storeID);
  }
  getUnitName(unitID?: string) {
    return this.unitService.getUnitName(unitID);
  }

  getRequests() {
    if (this.storeService.stores.length) {
      // const id = this.storeService.getStoreID(this.host);
      this.requestService.getRequestsByHost(this.host).subscribe((requests) => {
        this.requests = requests.map((req) => {
          return { inspected: false, request: req };
        });
        if (!this.requests.length) {
          this.loaderMessage = 'nothing to issue. create requests first';
        }
      });
      return;
    }
    this.storeService.getOutlets().subscribe((i) => {
      this.storeService.stores = i;

      // const id = this.storeService.getStoreID(this.host);
      this.requestService.getRequestsByHost(this.host).subscribe((requests) => {
        this.requests = requests.map((req) => {
          return { inspected: false, request: req };
        });
      });
    });
  }
  getMedicines() {
    if (this.medicineService.medicines.length) {
      return;
    }
    this.medicineService.getMedicines().subscribe((i) => {
      this.medicineService.medicines = i;
    });
  }
  getUnits() {
    if (this.unitService.units.length) {
      return;
    }
    this.unitService.getUnits().subscribe((i) => {
      this.unitService.units = i;
    });
  }
  inspect(item: any) {
    item.inspected = !item.inspected;
  }
  issue(request: any) {
    this.onIssue.emit({ id: request._id, req: request.items });
  }
}
