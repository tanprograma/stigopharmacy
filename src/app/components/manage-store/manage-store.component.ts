import { Component } from '@angular/core';
import { Outlet } from 'src/app/outlet';
import { OutletService } from 'src/app/services/outlet.service';
import { DataService } from 'src/app/services/data.service';
import { Client } from 'src/app/client';
@Component({
  selector: 'app-manage-store',
  templateUrl: './manage-store.component.html',
  styleUrls: ['./manage-store.component.css'],
})
export class ManageStoreComponent {
  constructor(
    private storeService: OutletService,
    private dataService: DataService
  ) {}
  activity!: string;
  stores: Outlet[] = [];
  ngOnInit(): void {
    this.activity = 'create';
    this.getStores();
  }
  setActivity(option: string) {
    this.activity = option;
  }
  getStores() {
    if (!this.storeService.stores.length) {
      this.storeService.getOutlets().subscribe((stores) => {
        console.log(stores);
        this.stores = stores;
        this.storeService.stores = stores;
      });
      return;
    }
    this.stores = this.storeService.stores;
  }
  createStore(item: Outlet) {
    this.storeService.postOutlet(item).subscribe((store) => {
      this.storeService.stores.push(store);
    });
  }
}
