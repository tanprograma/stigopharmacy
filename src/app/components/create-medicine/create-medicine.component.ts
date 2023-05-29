import { Component, OnInit } from '@angular/core';

import { Output, EventEmitter } from '@angular/core';
import { Medicine } from 'src/app/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrls: ['./create-medicine.component.css'],
})
export class CreateMedicineComponent implements OnInit {
  interval!: any;

  constructor(private medicineService: MedicineService) {}
  ngOnInit(): void {
    this.iniatialize();
  }
  message: string = 'loading...';
  medicines: Medicine[] = [];
  medicine: string = '';
  loading: boolean = false;
  prescription: Medicine = {
    name: '',
  };
  items: Medicine[] = [];
  load(isLoading: boolean) {
    this.loading = isLoading;
  }
  add() {
    if (!this.prescription.name?.length) return;
    const found = this.medicines.find((i) => {
      return i.name == this.prescription.name?.toUpperCase();
    });
    if (!found) {
      console.log('created it: product was unavailable');
      console.log({ found, name: this.prescription.name });
      this.items.splice(0, 0, { name: this.prescription.name.toUpperCase() });
      this.medicines.splice(0, 0, {
        name: this.prescription.name.toUpperCase(),
      });
      return;
    }

    console.log('cant creat it: product available');
    console.log({ found, name: this.prescription.name });
  }
  getmedicines() {
    if (this.medicineService.medicines.length) {
      this.medicines = this.medicineService.medicines;
      console.log({ medicines: this.medicines });
      return;
    }
    this.loading = true;
    this.medicineService.getMedicines().subscribe((i) => {
      this.medicines = i;
      this.medicineService.medicines = i;
      this.loading = false;
      console.log({ medicines: this.medicines });
    });
  }
  iniatialize() {
    this.getmedicines();

    // this.interval = setInterval(() => {
    //   const loading = !this.medicines.length;
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
