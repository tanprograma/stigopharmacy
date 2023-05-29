import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from 'src/app/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { of } from 'rxjs';

import { Store } from 'src/app/store';
import { ClientsService } from 'src/app/services/clients.service';
import { StoreService } from 'src/app/services/store.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { Inventory } from 'src/app/inventory';
import { Router } from '@angular/router';
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
})
export class IssueComponent implements OnInit {
  @Output() isLoading = new EventEmitter<boolean>();
  loading: boolean = false;
  message: string = 'loading';
  interval!: any;
  available?: number = 0;
  stores: Store[] = [];
  issued: any = [];
  medicines: Medicine[] = [];
  inventory: Inventory[] = [];
  medicine: string = '';
  requested = 0;
  constructor(
    private medicineService: MedicineService,
    private storeService: StoreService,
    private router: Router,
    private inventoryService: InventoryService
  ) {}
  ngOnInit(): void {
    this.getResources();
    this.initialize();
  }
  redirect() {
    setTimeout(() => {
      if (this.loading) {
        this.router.navigate(['/timeout']);
      }
    }, 5000);
  }
  issue() {
    this.loading = true;
    this.inventoryService.issue(this.prescription).subscribe((i) => {
      console.log({ issue: i });
      this.issued.splice(0, 0, this.prescription);
      this.loading = false;
    });
  }
  getAvailable() {
    const item = this.inventory.find((i) => {
      return i.commodity == this.medicine;
    });
    if (!item) return;
    this.available = this.inventoryService.getAvailable(item);
  }
  initialize() {
    this.loading = true;
    this.redirect();
    this.interval = setInterval(() => {
      const isLoading = !(this.medicines.length && this.stores.length);
      if (isLoading) {
        return;
      }
      this.stopLoading();
    }, 5);
  }
  stopLoading() {
    this.loading = false;
    clearInterval(this.interval);
  }

  getResources() {
    this.getMedicines();
    this.getStores();
  }

  getInventoryByStore() {
    this.inventoryService
      .getInventoryByStore(this.prescription.outlet)
      .subscribe((i) => {
        this.inventory = i;
      });
  }

  getStores() {
    if (this.storeService.stores.length) {
      this.stores = this.storeService.stores;
      return;
    }
    this.storeService.getStores().subscribe((i) => {
      this.stores = i;
      this.storeService.stores = i;
    });
  }
  getMedicines() {
    if (this.medicineService.medicines.length) {
      this.medicines = this.medicineService.medicines;
      return;
    }
    this.medicineService.getMedicines().subscribe((i) => {
      this.medicines = i;
      this.medicineService.medicines = i;
    });
  }
  prescription: {
    client: string;
    outlet: string;
    items: { quantity: number; commodity: string }[];
  } = {
    client: '',
    outlet: '',
    items: [],
  };

  add() {
    if (!this.requested && !this.medicine.length) return;
    this.prescription.items.splice(0, 0, {
      quantity: this.requested,
      commodity: this.medicine,
    });

    this.clearForm();
  }

  clearForm() {
    this.requested = 0;
    this.medicine = '';
  }
  clearPrescription() {
    this.prescription.items = [];
  }
}
