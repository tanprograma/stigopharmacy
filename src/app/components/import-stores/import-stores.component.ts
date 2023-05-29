import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/client';
import { Output, EventEmitter } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/store';
@Component({
  selector: 'app-import-stores',
  templateUrl: './import-stores.component.html',
  styleUrls: ['./import-stores.component.css'],
})
export class ImportStoresComponent implements OnInit {
  interval!: any;

  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    // this.iniatialize();
    this.getStores();
  }
  message: string = 'loading...';
  stores: Store[] = [];
  client: string = '';
  loading: boolean = false;
  prescription: Store = {
    name: '',
  };
  items: Store[] = [];
  load(isLoading: boolean) {
    this.loading = isLoading;
  }
  add(x: HTMLInputElement) {
    if (!x.files) return;
    const reader = new FileReader();
    if (x.files.length) {
      reader.readAsText(x.files[0]);
      reader.onload = this.parseStores;
      x.value = '';
    }
  }
  parseStores = (e: any) => {
    const data: string = e.target.result;
    const x = data
      .split('\r\n')
      .slice(1)
      .map((i) => {
        const k = i.split(',');
        return { name: k[0], isWarehouse: k[1] == 'TRUE' ? true : false };
      })
      .filter((i) => {
        return i.name.length != 0;
      });

    this.createStores(x);
  };
  createStores(x: Store[]) {
    const filtered: any = [];
    x.forEach((i) => {
      const found = this.stores.find((v) => {
        return v.name == i.name?.toUpperCase();
      });
      if (!found) {
        filtered.push(i);
      }
    });

    if (!filtered.length) return;

    this.loading = true;
    this.storeService.createStores(filtered).subscribe((i) => {
      console.log({ i });
      console.log({ filtered });
      this.items.splice(0, 0, ...i);
      this.stores.splice(0, 0, ...i);
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
      this.stores.push(...i);
      console.log({ stores: this.stores });
      this.storeService.stores = i;
      this.loading = false;
    });
  }
}
