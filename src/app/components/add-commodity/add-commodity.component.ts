import { Component, OnInit } from '@angular/core';
import { Commodity } from 'src/app/commodity';
import { CommodityService } from 'src/app/services/commodity.service';
import { UnitService } from 'src/app/services/unit.service';
import { DataService } from 'src/app/services/data.service';
import { Unit } from 'src/app/unit';
@Component({
  selector: 'app-add-commodity',
  templateUrl: './add-commodity.component.html',
  styleUrls: ['./add-commodity.component.css'],
})
export class AddCommodityComponent implements OnInit {
  constructor(
    private commodityService: CommodityService,
    private unitService: UnitService,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.getCommodities();
    this.getUnits();
  }
  commodities: Commodity[] = [];
  units: Unit[] = [];
  getCommodities() {
    if (!this.commodityService.commodities.length) {
      this.commodityService.getCommodities().subscribe((items) => {
        this.commodities = items; // console.log(stores);

        this.commodityService.commodities = items;
      });
      return;
    }
    this.commodities = this.commodityService.commodities;
  }
  getUnits() {
    if (!this.unitService.units.length) {
      this.unitService.getUnits().subscribe((items) => {
        this.units = items; // console.log(stores);

        this.unitService.units = items;
      });
      return;
    }
    this.commodities = this.commodityService.commodities;
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
  createCommodity() {
    this.commodityService
      .createCommodities(this.commodity)
      .subscribe((item) => {
        console.log(item);
        this.commodityService.commodities.push(item);
      });
    this.commodity = {
      name: '',
      inventory_level: 0,
      units: [{ name: '', quantity: 0 }],
    };
  }
}
