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

  constructor(private requestService: RequestService) {}
  issue(req: any) {
    this.requestService.issueRequest(req).subscribe((req) => {
      console.log({ issued: req });
      this.requestService.requests = this.requestService.requests.filter(
        (reqs) => {
          return reqs._id != req._id;
        }
      );
    });
  }
  ngOnInit(): void {}
}
