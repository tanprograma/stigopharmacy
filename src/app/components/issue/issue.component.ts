import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/client';
import { Commodity } from 'src/app/commodity';
import { Prescription } from 'src/app/prescription';
import { Rquest } from 'src/app/request';
import { ClientService } from 'src/app/services/client.service';
import { CommodityService } from 'src/app/services/commodity.service';
import { RequestService } from 'src/app/services/request.service';
import { UnitService } from 'src/app/services/unit.service';
import { Unit } from 'src/app/unit';
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
})
export class IssueComponent implements OnInit {
  @Input() host!: string;
  requests!: Prescription[];
  clients!: Client[];
  commodities!: Commodity[];
  units!: Unit[];
  constructor(
    private requestService: RequestService,
    private commodityService: CommodityService,
    private unitService: UnitService,
    private clientService: ClientService
  ) {}
  issue(req: any) {
    this.requestService.issueRequest(req).subscribe((req) => {});
  }
  ngOnInit(): void {}
  getCommodities() {
    this.commodityService.getCommodities().subscribe((i) => {
      this.commodities = i;
    });
  }
  getClients() {
    this.clientService.getClients().subscribe((i) => {
      this.clients = i;
    });
  }
  getUnits() {
    this.unitService.getUnits().subscribe((i) => {
      this.units = i;
    });
  }
  getUnit(i: string): any {
    return this.units.find((item) => {
      return (item._id = i);
    })?.name;
  }
  getCommodity(i: string): any {
    return this.commodities.find((item) => {
      return (item._id = i);
    })?.name;
  }
}
