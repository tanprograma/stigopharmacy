import { Component } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { StoreService } from 'src/app/services/store.service';
import { Medicine } from 'src/app/medicine';
import { Store } from 'src/app/store';
import { Inventory } from 'src/app/inventory';
@Component({
  selector: 'app-import-dispensed-server',
  templateUrl: './import-dispensed-server.component.html',
  styleUrls: ['./import-dispensed-server.component.css'],
})
export class ImportDispensedServerComponent {
  interval!: any;

  constructor(
    private inventoryService: InventoryService,
    private storeService: StoreService
  ) {}
  ngOnInit(): void {
    this.getStores();
  }
  date: string = '';
  store: string = '';
  inventory: Inventory[] = [];
  medicines: Medicine[] = [];

  stores: Store[] = [];
  message: string = 'loading...';
  uploaded: any = [];
  submitted: Inventory[] = [];

  loading: boolean = false;
  fetched: any = [];
  url: string = '';

  load(isLoading: boolean) {
    this.loading = isLoading;
  }
  add() {
    if (!this.fetched.length) return;

    this.uploadDispensed();
  }

  fetchDispensedFromServer() {
    if (!this.url.length || !this.store.length) return;
    // console.log(this.url);
    this.loading = true;
    this.inventoryService
      .getInventoryByURL(this.store, this.url)
      .subscribe((i: any) => {
        this.fetched = i
          .map((x: any) => {
            let { commodity, dispensed } = x;
            return {
              commodity: commodity,
              quantities: dispensed.map((y: any) => {
                let { quantity, date } = y;
                return { quantity, date };
              }),
            };
          })
          .filter((z: any) => {
            return z.quantities.length > 0;
          });
        this.loading = false;
      });
  }
  uploadDispensed() {
    const filtered: any = [];
    this.fetched.forEach((i: any) => {
      const found = this.inventory.find((v) => {
        return v.commodity == i.commodity;
      });
      if (!found) {
        return;
      }
      filtered.push(i);
    });

    if (!filtered.length) return;
    // console.log(filtered);

    this.loading = true;
    this.inventoryService
      .uploadDispensed({ store: this.store, items: filtered })
      .subscribe((i: any) => {
        console.log(i);
        this.uploaded = i;
        this.submitted = filtered;
        this.loading = false;
      });
  }
  getDispensed() {
    this.loading = true;
    console.log({ store: this.store });
    this.inventoryService
      .getInventoryByStore(this.store)
      .subscribe((i: any) => {
        this.inventory = i;
        console.log({ inventory: i });
        this.loading = false;
      });
  }
  getStores() {
    if (this.storeService.stores.length) {
      this.stores = this.storeService.stores;
      return;
    }
    this.loading = true;
    this.storeService.getStores().subscribe((i: any) => {
      this.stores = i;
      this.storeService.stores = i;
      this.loading = false;
    });
  }
}
