import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/medicine';
import { MedicineService } from 'src/app/services/medicine.service';

@Component({
  selector: 'app-outlet-container',
  templateUrl: './outlet-container.component.html',
  styleUrls: ['./outlet-container.component.css'],
})
export class OutletContainerComponent implements OnInit {
  medicines: Medicine[] = [];
  constructor(private medicineService: MedicineService) {}
  ngOnInit(): void {}
}
