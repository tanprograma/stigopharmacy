import { Component, Input, OnInit } from '@angular/core';
import { Commodity } from 'src/app/commodity';
import { Prescription } from 'src/app/prescription';
import { CommodityService } from 'src/app/services/commodity.service';
import { UnitService } from 'src/app/services/unit.service';
import { DataService } from 'src/app/services/data.service';
import { Unit } from 'src/app/unit';
import { MedicinesService } from 'src/app/services/medicines.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
})
export class PrescriptionComponent {
  @Input() request!: Prescription;
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

  getUnits(commodity: string) {
    const units = this.commodityService.commodities.find((c) => {
      return c.name == this.medicineService.getMedicineID(commodity);
    })?.units;

    return units?.map((u) => {
      return this.unitService.getUnitName(u.name);
    });
  }
  toggleEdit(item: any) {
    item.inspected = !item.inspected;
  }
}
