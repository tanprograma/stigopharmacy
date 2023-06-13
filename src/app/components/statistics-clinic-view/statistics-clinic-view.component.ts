import { Component, Input, Output } from '@angular/core';
import { Display } from 'src/app/display';
import { Inventory } from 'src/app/inventory';
import { Statistic } from 'src/app/classes/statistic';
@Component({
  selector: 'app-statistics-clinic-view',
  templateUrl: './statistics-clinic-view.component.html',
  styleUrls: ['./statistics-clinic-view.component.css'],
})
export class StatisticsClinicViewComponent {
  @Input() display!: Display;
  @Input() item!: Inventory;

  alarm?: boolean;
  reduceSum(item: any) {
    const reduced =
      item
        .map((i: any) => {
          return i.quantity;
        })
        .reduce((a: number, b: number) => {
          return a + b;
        }, 0) / (this.item.unit_value || 1);
    // if (!reduced) {
    //   return 0;
    // }
    return Math.floor(reduced);
  }
  getAvailable() {
    // console.log(this.item);
    const beginning = this.item.beginning / (this.item.unit_value || 1);
    const received = this.reduceSum(this.item.received);
    const issued = this.reduceSum(this.item.issued);
    const dispensed = this.reduceSum(this.item.dispensed);
    const available = beginning + received - (dispensed + issued);
    // console.log({ available, beginning, received, dispensed });
    if (!available) {
      this.setAlarm(0);
      return 0;
    }
    this.setAlarm(Math.floor(available));
    return Math.floor(available);
  }
  setAlarm(v: number) {
    if (!this.item.outlet) {
      this.alarm = v > (this.item.inventory_level || 0) ? false : true;
    }
  }
}
