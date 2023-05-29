import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from 'src/app/store';

@Component({
  selector: 'app-statistic-form',
  templateUrl: './statistic-form.component.html',
  styleUrls: ['./statistic-form.component.css'],
})
export class StatisticFormComponent {
  @Input() outlets!: Store[];
  @Input() menuState!: boolean;
  @Output() onFilterDate = new EventEmitter<{
    startDate: Date;
    endDate: Date;
  }>();
  @Output() onAllTimeFilter = new EventEmitter<boolean>();
  @Output() onFilterStore = new EventEmitter<string>();
  startDate: string = '';
  all: string = 'ALL';
  outlet: string = '';
  endDate: string = '';
  searchbox: boolean = false;

  toggleSearch() {
    this.searchbox = !this.searchbox;
  }
  todayFilter() {
    const now = new Date();
    const day = now.getUTCDate();
    const month = now.getUTCMonth() + 1;
    const year = now.getUTCFullYear();
    const date = new Date(`${month}/${day}/${year}`);
    const endDate = new Date(`${month}/${day + 1}/${year}`);
    this.onFilterDate.emit({ startDate: date, endDate: endDate });
    console.log({ day, month, year });
  }
  allTimeFilter() {
    this.onAllTimeFilter.emit(true);
  }
  filterStore() {
    const found = this.outlets.find((i) => {
      return i.name == this.outlet;
    });
    if (!found) {
      if (this.outlet == this.all) {
        this.onFilterStore.emit(this.outlet);
        return;
      }
      return;
    }
    this.onFilterStore.emit(this.outlet);
  }
  filterDate() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    if (
      !startDate.getDate() ||
      !endDate.getDate() ||
      (!startDate.getDate() && !startDate.getDate())
    ) {
      return;
    }
    // console.log({ startDate, endDate });
    this.onFilterDate.emit({ startDate, endDate });
  }
}
