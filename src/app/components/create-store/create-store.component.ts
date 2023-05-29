import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/store';
@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css'],
})
export class CreateStoreComponent {
  interval!: any;

  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    this.iniatialize();
  }
  message: string = 'loading...';
  stores: Store[] = [];
  store: string = '';
  loading: boolean = false;
  prescription: Store = {
    name: '',
    isWarehouse: false,
  };
  items: Store[] = [];
  load(isLoading: boolean) {
    this.loading = isLoading;
  }
  add(checked: boolean) {
    if (checked) {
      this.prescription.isWarehouse = true;
      console.log(this.prescription);
    }
    if (!this.prescription.name?.length) return;
    const found = this.stores.find((i) => {
      return i.name == this.prescription.name?.toUpperCase();
    });
    if (!found) {
      console.log('created it: product was unavailable');
      console.log({ found, name: this.prescription.name });
      this.items.splice(0, 0, { name: this.prescription.name.toUpperCase() });
      this.stores.splice(0, 0, { name: this.prescription.name.toUpperCase() });
      return;
    }

    console.log('cant creat it: product available');
    console.log({ found, name: this.prescription.name });
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
  iniatialize() {
    this.getStores();

    // this.interval = setInterval(() => {
    //   const loading = !this.stores.length;
    //   if (loading) {
    //     this.loadStatus();
    //     return;
    //   }
    //   this.stopLoading();
    // }, 5);
  }
  stopLoading() {
    this.loading = false;
    clearInterval(this.interval);
  }
  loadStatus() {
    this.loading = true;
  }
}
