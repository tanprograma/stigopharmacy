import { Component, OnInit } from '@angular/core';
import { Commodity } from 'src/app/commodity';
import { Prescription } from 'src/app/prescription';
import { CommodityService } from 'src/app/services/commodity.service';
import { UnitService } from 'src/app/services/unit.service';
import { DataService } from 'src/app/services/data.service';
import { Unit } from 'src/app/unit';
import { MedicinesService } from 'src/app/services/medicines.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-manage-stock-prescription',
  templateUrl: './manage-stock-prescription.component.html',
  styleUrls: ['./manage-stock-prescription.component.css'],
})
export class ManageStockPrescriptionComponent {
  @Input() request!: {
    store: string;
    items: {
      commodity?: string;
      quantity: number;
      inspected?: boolean;
      unit: string;
    }[];
  };
  commodities!: Commodity[];

  constructor(
    private unitService: UnitService,
    private commodityService: CommodityService,
    private medicineService: MedicinesService
  ) {}

  delete(item: any) {
    this.request.items = this.request.items.filter((i) => {
      return i != item;
    });
  }
  getMedicineName(medicine?: string) {
    return this.medicineService.getMedicineName(medicine);
  }

  toggleEdit(item: any) {
    item.inspected = !item.inspected;
  }
}
