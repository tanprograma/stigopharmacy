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
  selector: 'app-statistic-form',
  templateUrl: './statistic-form.component.html',
  styleUrls: ['./statistic-form.component.css'],
})
export class StatisticFormComponent {
  faFilter = faFilter;
  faBars = faBars;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  medicine: string = '';
  @Input() medicines!: Medicine[];
  @Input() outlets!: Store[];
  @Input() menuState!: boolean;
  @Output() onFilterDate = new EventEmitter<{
    startDate: Date;
    endDate: Date;
  }>();
  @Output() onAllTimeFilter = new EventEmitter<boolean>();
  @Output() onFilterStore = new EventEmitter<string>();
  @Output() onGetLt = new EventEmitter<boolean>();
  @Output() onGetGt = new EventEmitter<boolean>();
  @Output() onClearQuantityFilter = new EventEmitter<boolean>();
  @Output() onClearMedicineFilter = new EventEmitter<boolean>();
  @Output() onFilterProduct = new EventEmitter<string>();
  startDate: string = '';
  all: string = 'ALL';
  outlet: string = '';

  endDate: string = '';
  // form filters and toggling
  searchbox: boolean = false;
  quantitybox: boolean = false;
  filtersbox: boolean = false;
  itembox: boolean = false;
  toggleSearch() {
    this.searchbox = !this.searchbox;
  }
  toggleItem() {
    this.itembox = !this.itembox;
  }
  toggleFilters() {
    this.filtersbox = !this.filtersbox;
  }
  toggleQuantity() {
    this.quantitybox = !this.quantitybox;
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
  // code for clearing filters
  clearQuantityFilter() {
    this.onClearQuantityFilter.emit(true);
  }
  // code for clearing filters
  // end form filters and toggling
  // start of date filtering
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
    const now = new Date();
    const day = now.getUTCDate();
    const month = now.getUTCMonth() + 1;
    const year = now.getUTCFullYear();
    const date = new Date(`${1}/${1}/${1970}`);
    const endDate = new Date(`${month}/${day + 1}/${year}`);
    this.onFilterDate.emit({ startDate: date, endDate: endDate });
    console.log({ day, month, year });
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

  // code for filtering quantity

  getGt() {
    this.onGetGt.emit(true);
  }
  getLt() {
    this.onGetLt.emit(true);
  }
  // end of code for quantity filters
}
