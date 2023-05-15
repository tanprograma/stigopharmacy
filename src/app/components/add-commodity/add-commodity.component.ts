import { Component, OnInit } from '@angular/core';
import { Commodity } from 'src/app/commodity';
import { CommodityService } from 'src/app/services/commodity.service';
import { UnitService } from 'src/app/services/unit.service';
import { DataService } from 'src/app/services/data.service';
import { Unit } from 'src/app/unit';
import { MedicinesService } from 'src/app/services/medicines.service';
import { Medicine } from 'src/app/medicine';
@Component({
  selector: 'app-add-commodity',
  templateUrl: './add-commodity.component.html',
  styleUrls: ['./add-commodity.component.css'],
})
export class AddCommodityComponent implements OnInit {
  constructor(
    private commodityService: CommodityService,
    private unitService: UnitService,
    private medicineService: MedicinesService,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.getCommodities();
    this.getUnits();
  }
  commodities: Commodity[] = [];
  units: Unit[] = [];
  medicines: Medicine[] = [];
  created: Commodity[] = [];
  getCommodities() {
    if (
      !this.medicineService.medicines.length &&
      !this.commodityService.commodities.length
    ) {
      this.medicineService.getMedicines().subscribe((medicines) => {
        this.medicineService.medicines = medicines;
        console.log({ medicines });
        this.commodityService.getCommodities().subscribe((commodities) => {
          medicines.forEach((medicine) => {
            console.log({ commodities });
            const found = commodities.find((i) => {
              return i.name == medicine._id;
            });
            if (!found) {
              this.medicines.push(medicine);
            }
          });
          console.log({ medicines: this.medicines });

          this.commodityService.commodities = commodities;
        });
      });
      return;
    }

    this.medicineService.medicines.forEach((medicine) => {
      const found = this.commodityService.commodities.find((i) => {
        return i.name == medicine._id;
      });
      if (!found) {
        this.medicines.push(medicine);
      }
    });
  }
  getUnits() {
    if (!this.unitService.units.length) {
      this.unitService.getUnits().subscribe((items) => {
        this.units = items;
        console.log({ unitincommodity: items });
        this.unitService.units = items;
      });
      return;
    }
    this.units = this.unitService.units;
  }
  commodity: Commodity = {
    name: '',
    inventory_level: 0,
    units: [{ name: '', quantity: 0 }],
  };
  add() {
    this.commodity.units.push({ name: '', quantity: 0 });
  }
  rmunit(item: { name: string; quantity: number }) {
    this.commodity.units = this.commodity.units.filter(
      (i: { name: string; quantity: number }) => {
        return i != item;
      }
    );
  }
  getMedicineName(medicine: string) {
    return this.medicineService.getMedicineName(medicine);
  }
  createCommodity() {
    const payload = this.mutatePayload();
    this.commodityService.createCommodities(payload).subscribe((item) => {
      console.log(item);
      this.created.push(item);
      this.commodityService.commodities.push(item);
      this.medicines = this.medicines.filter((i) => {
        return i._id != item.name;
      });
    });
    this.commodity = {
      name: '',
      inventory_level: 0,
      units: [{ name: '', quantity: 0 }],
    };
  }
  mutatePayload() {
    return {
      name: this.medicineService.getMedicineID(this.commodity.name),
      inventory_level: this.commodity.inventory_level,
      units: this.commodity.units.map((i) => {
        let { name, quantity } = i;
        name = this.unitService.getUnitID(name);

        return { name, quantity };
      }),
    };
  }
}
