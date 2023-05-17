import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/client';
import { Outlet } from 'src/app/outlet';
import { Input, Output, EventEmitter } from '@angular/core';
import { Unit } from 'src/app/unit';
import { Commodity } from 'src/app/commodity';
import { DataService } from 'src/app/services/data.service';
import { UnitService } from 'src/app/services/unit.service';
import { OutletService } from 'src/app/services/outlet.service';
import { CommodityService } from 'src/app/services/commodity.service';
import { Prescription } from 'src/app/prescription';
import { MedicinesService } from 'src/app/services/medicines.service';
import { ClientService } from 'src/app/services/client.service';
import { Observable, of } from 'rxjs';
import { Medicine } from 'src/app/medicine';
@Component({
  selector: 'app-issue-form-request',
  templateUrl: './issue-form-request.component.html',
  styleUrls: ['./issue-form-request.component.css'],
})
export class IssueFormRequestComponent implements OnInit {
  constructor(
    public unitService: UnitService,
    private commodityService: CommodityService,
    private storeService: OutletService,
    public medicineService: MedicinesService
  ) {}

  clients: Outlet[] = [];

  commodities: Commodity[] = [];
  medicines: Medicine[] = [];
  units: Unit[] = [];
  @Input() prescription!: Prescription;
  @Output() prescriptionChange = new EventEmitter<Prescription>();

  dbUnits?: Unit[];
  xunits: any = [];

  getMedUnits(commodity: string) {
    let commodityUnits = this.commodityService.commodities.find((i) => {
      return i.name == this.medicineService.getMedicineID(commodity);
    })?.units;
    this.xunits = commodityUnits?.map((x) => {
      return this.unitService.units.find((i) => {
        return i._id == x.name;
      })?.name;
    });
  }
  ngOnInit(): void {
    this.getCommodities();
    this.getClients();
    this.getMedicines();
    this.getUnits();
  }
  toNumber(i: string): number {
    return Number(i);
  }
  getMedicineName(medicine?: string) {
    return this.medicineService.getMedicineName(medicine);
  }
  getClients() {
    if (!this.storeService.stores) {
      this.storeService.getOutlets().subscribe((i) => {
        this.storeService.stores = i;
        this.clients = i.filter((i) => {
          return !i.isSupplier;
        });
      });
      return;
    }
    this.clients = this.storeService.stores.filter((i) => {
      return !i.isSupplier && i.name != this.prescription.client;
    });
  }
  getCommodities() {
    if (!this.commodityService.commodities) {
      this.commodityService.getCommodities().subscribe((i) => {
        this.commodityService.commodities = i;
        this.commodities = i;
      });
      return;
    }
    this.commodities = this.commodityService.commodities;
  }
  getMedicines() {
    if (!this.medicineService.medicines) {
      this.medicineService.getMedicines().subscribe((i) => {
        this.medicineService.medicines = i;
        this.medicines = i;
      });
      return;
    }
    this.medicines = this.medicineService.medicines;
  }
  getUnits() {
    if (!this.unitService.units) {
      this.unitService.getUnits().subscribe((i) => {
        this.unitService.units = i;
        this.units = i;
      });
      return;
    }
    this.medicines = this.unitService.units;
  }
  add(item: {
    outlet: string;
    inspected?: boolean;
    commodity: string;
    requested: number;
    issued: number;
    unit: string;
  }) {
    const { commodity, requested, inspected, issued, unit, outlet } = item;
    const commodityItem: {
      inspected?: boolean;
      commodity: string;
      requested: number;
      issued: number;
      unit: string;
    } = { commodity, requested, inspected, issued, unit };
    this.prescription.host = outlet;
    this.prescription.items.push(commodityItem);

    this.prescriptionChange.emit(this.prescription);
  }
}
