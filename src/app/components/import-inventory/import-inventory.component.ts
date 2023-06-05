import { Component } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { StoreService } from 'src/app/services/store.service';
import { Medicine } from 'src/app/medicine';
import { Store } from 'src/app/store';
import { Inventory } from 'src/app/inventory';
@Component({
  selector: 'app-import-inventory',
  templateUrl: './import-inventory.component.html',
  styleUrls: ['./import-inventory.component.css'],
})
export class ImportInventoryComponent {
  interval!: any;

  constructor(
    private inventoryService: InventoryService,
    private storeService: StoreService
  ) {}
  ngOnInit(): void {
    this.getStores();
  }

  store: string = '';
  inventory: Inventory[] = [];
  medicines: Medicine[] = [];
  stores: Store[] = [];
  message: string = 'loading...';
  uploaded: any = [];
  submitted: Inventory[] = [];
  client: string = '';
  loading: boolean = false;
  prescription: Medicine = {
    name: '',
  };

  load(isLoading: boolean) {
    this.loading = isLoading;
  }
  add(x: HTMLInputElement) {
    if (!x.files) return;
    const reader = new FileReader();
    if (x.files.length) {
      reader.readAsText(x.files[0]);
      reader.onload = this.parseDispensed;
      x.value = '';
    }
  }

  parseDispensed = (e: any) => {
    const data: string = e.target.result;
    const headers = data.split('\r\n')[0].split(',');

    const body = data
      .split('\r\n')
      .slice(1)
      .map((i) => {
        const l = i.split(',');
        return {
          commodity: l[0].toUpperCase(),
          beginning: Number(l[1]),
        };
      })
      .filter((i) => {
        return i.commodity.length > 0;
      });
    // console.log(body);
    this.uploadInventory(body);
  };
  uploadInventory(x: any) {
    const filtered: any = [];
    x.forEach((i: any) => {
      const found = this.inventory.find((v) => {
        return v.commodity == i.commodity?.toUpperCase();
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
      .uploadBeginning({ store: this.store, items: filtered })
      .subscribe((i) => {
        // console.log(i);
        this.uploaded = i;
        this.submitted = filtered;
        this.loading = false;
      });
  }
  getDispensed() {
    this.loading = true;
    console.log({ store: this.store });
    this.inventoryService.getInventoryByStore(this.store).subscribe((i) => {
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
    this.storeService.getStores().subscribe((i) => {
      this.stores = i;
      this.storeService.stores = i;
      this.loading = false;
    });
  }
}
