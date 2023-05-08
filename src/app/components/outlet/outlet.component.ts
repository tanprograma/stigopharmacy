import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commodity } from 'src/app/commodity';
import { Medicine } from 'src/app/medicine';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrls: ['./outlet.component.css'],
})
export class OutletComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  outlet: any;
  option!: string;
  ngOnInit(): void {
    this.option = 'all';
    this.outlet = this.activatedRoute.snapshot.paramMap.get('outlet');
    this.dataService.loadStoreOptions(this.outlet);
  }
  setActivity(option: string) {
    this.option = option;
  }
  // getOutlets() {
  //   if (!this.dataService.stores.length) {
  //     this.storeService.getOutlets().subscribe((outlets) => {
  //       this.outlets = outlets;
  //     });
  //     return;
  //   }
  //   this.outlets = this.dataService.stores;
  // }
}
