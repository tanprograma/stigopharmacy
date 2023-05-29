import { Component, OnInit } from '@angular/core';

import { MedicineService } from 'src/app/services/medicine.service';
import { Medicine } from 'src/app/medicine';
@Component({
  selector: 'app-import-medicines',
  templateUrl: './import-medicines.component.html',
  styleUrls: ['./import-medicines.component.css'],
})
export class ImportMedicinesComponent implements OnInit {
  interval!: any;

  constructor(private medicineService: MedicineService) {}
  ngOnInit(): void {
    // this.iniatialize();
    this.getMedicines();
  }
  message: string = 'loading...';
  medicines: Medicine[] = [];
  client: string = '';
  loading: boolean = false;
  prescription: Medicine = {
    name: '',
  };
  items: Medicine[] = [];
  load(isLoading: boolean) {
    this.loading = isLoading;
  }
  add(x: HTMLInputElement) {
    if (!x.files) return;
    const reader = new FileReader();
    if (x.files.length) {
      reader.readAsText(x.files[0]);
      reader.onload = this.parseMedicines;
      x.value = '';
    }
  }
  parseMedicines = (e: any) => {
    const data: string = e.target.result;
    const headers = data.split('\r\n')[0].split(',');
    // console.log(headers);

    const x = data
      .split('\r\n')
      .slice(1)
      .map((i) => {
        const k = i.split(',');
        return { name: k[0], unit: k[1], unit_value: Number(k[2]) };
      })
      .filter((i) => {
        return i.name.length != 0;
      });

    console.log(x);
    this.createMedicines(x);
  };
  createMedicines(x: Medicine[]) {
    const filtered: any = [];
    x.forEach((i) => {
      const found = this.medicines.find((v) => {
        return v.name == i.name?.toUpperCase();
      });
      if (!found) {
        filtered.push(i);
      }
    });

    if (!filtered.length) return;

    this.loading = true;
    this.medicineService.createMedicines(filtered).subscribe((i) => {
      this.items.splice(0, 0, ...i);
      this.medicines.splice(0, 0, ...i);
      this.loading = false;
    });
  }
  getMedicines() {
    if (this.medicineService.medicines.length) {
      this.medicines = this.medicineService.medicines;
      return;
    }
    this.loading = true;
    this.medicineService.getMedicines().subscribe((i) => {
      this.medicines = i;
      this.medicineService.medicines = i;
      this.loading = false;
    });
  }
}
