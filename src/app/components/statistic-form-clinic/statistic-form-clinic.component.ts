import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from 'src/app/store';
import {
  faFilter,
  faAngleDown,
  faAngleUp,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { Medicine } from 'src/app/medicine';

@Component({
  selector: 'app-statistic-form-clinic',
  templateUrl: './statistic-form-clinic.component.html',
  styleUrls: ['./statistic-form-clinic.component.css'],
})
export class StatisticFormClinicComponent {
  faFilter = faFilter;
  faBars = faBars;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  medicine: string = '';
  @Input() medicines!: Medicine[];
  @Input() statistics!: string[];
  @Input() outlets!: Store[];
  @Input() menuState!: boolean;
  @Output() onFilterDate = new EventEmitter<{
    startDate: Date;
    endDate: Date;
  }>();
  @Output() onGetAll = new EventEmitter<boolean>();
  @Output() onGetDispensed = new EventEmitter<boolean>();
  @Output() onGetIssued = new EventEmitter<boolean>();
  @Output() onGetReceived = new EventEmitter<boolean>();
  @Output() onSetStatistic = new EventEmitter<string>();
  @Output() onAllTimeFilter = new EventEmitter<boolean>();
  @Output() onFilterStore = new EventEmitter<string>();
  @Output() onGetLt = new EventEmitter<boolean>();
  @Output() onGetGt = new EventEmitter<boolean>();
  @Output() onClearQuantityFilter = new EventEmitter<boolean>();
  @Output() onClearMedicineFilter = new EventEmitter<boolean>();
  @Output() onFilterProduct = new EventEmitter<string>();
  allTime: string = 'ALL TIME';
  todayTime: string = 'TODAY';
  anyTime: string = 'FILTER BY DATE';
  durationFilter: string = this.allTime;
  startDate: string = '';
  all: string = 'ALL';
  outlet: string = '';
  endDate: string = '';
  searchbox: boolean = false;
  statisticsbox: boolean = false;
  filtersbox: boolean = false;
  quantitybox: boolean = false;
  itembox: boolean = false;
  toggleItem() {
    this.itembox = !this.itembox;
  }
  toggleQuantity() {
    this.quantitybox = !this.quantitybox;
  }

  toggleSearch() {
    this.durationFilter = this.anyTime;
    this.searchbox = !this.searchbox;
  }
  toggleStatistics() {
    this.statisticsbox = !this.statisticsbox;
  }
  toggleFilters() {
    this.filtersbox = !this.filtersbox;
  }
  setStatistic(statistic: any) {
    this.onSetStatistic.emit(statistic);
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
  // code for product filter
  filterProduct() {
    const validProduct = this.medicines.find((i) => {
      return i.name == this.medicine;
    });
    if (!validProduct) return;
    this.onFilterProduct.emit(this.medicine);
  }
  clearProductFilter() {
    this.onClearMedicineFilter.emit(true);
  }
  // end of code for product filter
  // start of date filtering
  todayFilter() {
    const now = new Date();
    const day = now.getUTCDate();
    const month = now.getUTCMonth() + 1;
    const year = now.getUTCFullYear();
    const date = new Date(`${month}/${day}/${year}`);
    const endDate = new Date(`${month}/${day + 1}/${year}`);
    this.onFilterDate.emit({ startDate: date, endDate: endDate });
    this.durationFilter = this.todayTime;
  }
  allTimeFilter() {
    const now = new Date();
    const day = now.getUTCDate();
    const month = now.getUTCMonth() + 1;
    const year = now.getUTCFullYear();
    const date = new Date(`${1}/${1}/${1970}`);
    const endDate = new Date(`${month}/${day + 1}/${year}`);
    this.onFilterDate.emit({ startDate: date, endDate: endDate });
    this.durationFilter = this.allTime;
  }

  filterDate() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    if (
      !startDate.getDate() ||
      !endDate.getDate() ||
      (!startDate.getDate() && !startDate.getDate())
    ) {
      console.log('failed date');
      return;
    }
    console.log({ okay: true, date: { startDate, endDate } });
    this.onFilterDate.emit({ startDate, endDate });
  }
  // end of date filtering

  // start of quantity filtering
  clearQuantityFilter() {
    this.onClearQuantityFilter.emit(true);
  }
  getGt() {
    this.onGetGt.emit(true);
  }
  getLt() {
    this.onGetLt.emit(true);
  }
  getAll() {
    this.onGetAll.emit(true);
  }
  // end of quantity filtering
  // start fo statistic filtering
  getDispensed() {
    this.onGetDispensed.emit(true);
  }
  getReceived() {
    this.onGetReceived.emit(true);
  }
  getIssued() {
    this.onGetReceived.emit(true);
  }
}
