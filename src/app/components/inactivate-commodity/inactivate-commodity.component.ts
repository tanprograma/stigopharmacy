import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Commodity } from 'src/app/commodity';
import { CommodityService } from 'src/app/services/commodity.service';
import { MedicinesService } from 'src/app/services/medicines.service';

@Component({
  selector: 'app-inactivate-commodity',
  templateUrl: './inactivate-commodity.component.html',
  styleUrls: ['./inactivate-commodity.component.css'],
})
export class InactivateCommodityComponent implements OnInit {
  @Input() loading!: boolean;
  @Input() message!: string;
  @Output() loadingChange = new EventEmitter<boolean>();
  @Output() messageChange = new EventEmitter<string>();
  items: Commodity[] = [];
  title: string = 'activate/inactivate commodities';
  x: string = '';
  commodities: Commodity[] = [];
  constructor(
    private medicineService: MedicinesService,
    private commodityService: CommodityService
  ) {}
  ngOnInit(): void {
    this.items = this.items ? this.items : [];
    this.getCommodities();
    this.getMedicines();
  }
  collapsed: boolean = true;
  collapse() {
    this.collapsed = !this.collapsed;
  }
  inactivate() {
    if (!this.x.length) return;
    const commodity_id = this.getMedicineID(this.x);
    this.loadingChange.emit(!this.loading);
    this.message = `inactivating ${this.x}`;
    this.messageChange.emit(this.message);
    console.log('inactivated');
    this.commodityService
      .activateCommodities({ commodity: commodity_id || '', active: false })
      .subscribe((i) => {
        this.items.splice(0, 0, i);
        this.loadingChange.emit(!this.loading);
        this.x = '';
      });
  }
  activate() {
    if (!this.x.length) return;
    const commodity_id = this.getMedicineID(this.x);
    this.loadingChange.emit(!this.loading);
    this.message = `activating ${this.x}`;
    this.messageChange.emit(this.message);
    this.commodityService
      .activateCommodities({ commodity: commodity_id || '', active: true })
      .subscribe((i) => {
        this.items.splice(0, 0, i);
        this.loadingChange.emit(!this.loading);
        this.x = '';
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
  getCommodities() {
    if (this.commodityService.commodities.length) {
      this.commodities = this.commodityService.commodities;
      return;
    }
    this.commodityService.getCommodities().subscribe((i) => {
      this.commodities = i;
      this.commodityService.commodities = i;
    });
  }
  getMedicineName(commodity?: string) {
    return this.medicineService.getMedicineName(commodity);
  }
  getMedicineID(commodity?: string) {
    return this.medicineService.getMedicineID(commodity);
  }
  activeStyle = {
    backgroundColor: 'green',
    color: 'white',
  };
  inactiveStyle = {
    backgroundColor: 'red',
    color: 'white',
  };
}
