import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/medicine';
import { MedicinesService } from 'src/app/services/medicines.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-manage-medicine',
  templateUrl: './manage-medicine.component.html',
  styleUrls: ['./manage-medicine.component.css'],
})
export class ManageMedicineComponent implements OnInit {
  constructor(
    private medicineService: MedicinesService,
    private dataService: DataService
  ) {}
  activity!: string;
  medicines: Medicine[] = [];
  ngOnInit(): void {
    this.activity = 'create';
    this.getMedicines();
  }
  setActivity(option: string) {
    this.activity = option;
  }
  getMedicines() {
    if (!this.medicineService.medicines.length) {
      this.medicineService.getMedicines().subscribe((medicines) => {
        console.log(medicines);
        this.medicines = medicines;
        this.medicineService.medicines = medicines;
      });
      return;
    }
    this.medicines = this.medicineService.medicines;
  }
}
