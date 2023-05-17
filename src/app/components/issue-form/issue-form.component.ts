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
import { of, Observable } from 'rxjs';
@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.css'],
})
export class IssueFormComponent implements OnInit {
  constructor(
    private dataService: DataService,
    public unitService: UnitService,
    private commodityService: CommodityService,
    private storeService: OutletService,
    public medicineService: MedicinesService,
    private clientService: ClientService
  ) {}

  clients: Observable<Client[]> = of(this.clientService.clients);
  xclients?: Client[];
  xcommodities?: Commodity[];
  commodities: Observable<Commodity[]> = of(this.commodityService.commodities);
  xunits: Observable<Unit[]> = of(this.unitService.units);
  @Input() prescription!: Prescription;
  @Output() prescriptionChange = new EventEmitter<Prescription>();
  @Input() outlet?: string;
  dbUnits?: Unit[];
  units?: (string | undefined)[];
  date: any = '';

  getUnits(commodity: string) {
    this.commodities.subscribe((commodities) => {
      this.xunits.subscribe((xu) => {
        this.units = commodities
          .find((c) => {
            return c.name == this.medicineService.getMedicineID(commodity);
          })
          ?.units.map((u) => {
            return this.unitService.getUnitName(u.name);
          });
      });
    });
  }
  ngOnInit(): void {
    this.commodities.subscribe((i) => {
      this.commodityService.commodities = i;
      this.xcommodities = i;
    });
    this.clients.subscribe((i) => {
      this.clientService.clients = i;
      this.xclients = i;
    });
  }
  toNumber(i: string): number {
    return Number(i);
  }
  add(item: {
    client: string;
    inspected?: boolean;
    commodity: string;
    requested: number;
    issued: number;
    unit: string;
  }) {
    const { commodity, requested, inspected, issued, unit, client } = item;
    const commodityItem: {
      inspected?: boolean;
      commodity: string;
      requested: number;
      issued: number;
      unit: string;
    } = { commodity, requested, inspected, issued, unit };
    this.prescription.client = client;

    this.prescription.date = this.date;
    this.prescription.items.push(commodityItem);

    this.prescriptionChange.emit(this.prescription);
  }
}
