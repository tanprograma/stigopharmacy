import { Component, OnInit } from '@angular/core';

import { Output, EventEmitter } from '@angular/core';
import { Medicine } from 'src/app/medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { UnitService } from 'src/app/services/unit.service';
import { Unit } from 'src/app/unit';
@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrls: ['./create-medicine.component.css'],
})
export class CreateMedicineComponent implements OnInit {
  interval!: any;

  constructor(
    private medicineService: MedicineService,
    private unitService: UnitService
  ) {}
  ngOnInit(): void {
    this.getResources();
    this.iniatialize();
  }
  message: string = 'loading...';
  medicines: Medicine[] = [];
  units: Unit[] = [];
  medicine: string = '';
  loading: boolean = false;
  prescription: Medicine = {
    name: '',
    unit: '',
    unit_value: 0,
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
      // console.log('created it: product was unavailable');
      // console.log({ found, name: this.prescription.name });
      this.medicineService.createMedicine(this.prescription).subscribe((i) => {
        this.items.splice(0, 0, i);
        this.medicines.splice(0, 0, i);
      });
      this.prescription = {
        name: '',
        unit: '',
        unit_value: 0,
      };
      return;
    }

    console.log('cant creat it: product available');
    console.log({ found, name: this.prescription.name });
  }
  getmedicines() {
    if (this.medicineService.medicines.length) {
      this.medicines = this.medicineService.medicines;
      // console.log({ medicines: this.medicines });
      return;
    }
    this.loading = true;
    this.medicineService.getMedicines().subscribe((i) => {
      this.medicines = i;
      this.medicineService.medicines = i;
      this.loading = false;
      // console.log({ medicines: this.medicines });
    });
  }
  getUnits() {
    if (this.unitService.units.length) {
      this.units = this.unitService.units;
      // console.log({ medicines: this.medicines });
      return;
    }
    this.loading = true;
    this.unitService.getUnits().subscribe((i) => {
      this.units = i;
      this.unitService.units = i;
      this.loading = false;
      // console.log({ medicines: this.medicines });
    });
  }
  getResources() {
    this.getmedicines();
    this.getUnits();
  }
  iniatialize() {
    const loading = true;
    this.interval = setInterval(() => {
      this.checkStatus();
    }, 1);
  }
  checkStatus() {
    const loading: boolean = !(this.units.length && this.medicines.length);
    if (loading) return;
    this.loading = false;
    clearInterval(this.interval);
  }
}
