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
  requests: Observable<Prescription[]> = of(this.requestService.requests);
  xrequests!: any;

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
    this.requests.subscribe((requests) => {
      this.xrequests = requests.map((i) => {
        return { inspected: false, request: i };
      });
    });
  }

  inspect(item: any) {
    item.inspected = !item.inspected;
  }
  issue(request: any) {
    this.onIssue.emit({ id: request._id, req: request.items });
  }
}
