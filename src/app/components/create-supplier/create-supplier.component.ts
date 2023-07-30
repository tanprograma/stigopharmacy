import { Component, OnInit } from '@angular/core';

import { SupplierService } from 'src/app/services/supplier.service';
import { Supplier } from 'src/app/supplier';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css'],
})
export class CreateSupplierComponent {
  interval!: any;

  constructor(private supplierService: SupplierService) {}
  ngOnInit(): void {
    this.iniatialize();
  }
  message: string = 'loading...';
  suppliers: Supplier[] = [];
  supplier: string = '';
  loading: boolean = false;
  prescription: Supplier = {
    name: '',
  };
  items: Supplier[] = [];
  load(isLoading: boolean) {
    this.loading = isLoading;
  }
  add() {
    if (!this.prescription.name?.length) return;
    const found = this.suppliers.find((i) => {
      return i.name == this.prescription.name?.toUpperCase();
    });
    if (!found) {
      // console.log('created it: product was unavailable');
      // console.log({ found, name: this.prescription.name });
      this.loading = true;
      this.supplierService.createSupplier(this.prescription).subscribe((s) => {
        this.items.splice(0, 0, { name: s?.name?.toUpperCase() });
        this.suppliers.splice(0, 0, {
          name: s?.name?.toUpperCase(),
        });
        this.loading = false;
      });
    }

    console.log('cant creat it: product available');
    console.log({ found, name: this.prescription.name });
  }
  getSuppliers() {
    if (this.supplierService.suppliers.length) {
      this.suppliers = this.supplierService.suppliers;
      return;
    }
    this.loading = true;
    this.supplierService.getSuppliers().subscribe((i) => {
      this.suppliers = i;
      this.supplierService.suppliers = i;
      this.loading = false;
    });
  }
  iniatialize() {
    this.getSuppliers();
  }
  stopLoading() {
    this.loading = false;
    clearInterval(this.interval);
  }
  loadStatus() {
    this.loading = true;
  }
}
