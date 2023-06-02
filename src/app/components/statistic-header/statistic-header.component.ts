import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faBurger,
  faAngleDown,
  faAngleUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-statistic-header',
  templateUrl: './statistic-header.component.html',
  styleUrls: ['./statistic-header.component.css'],
})
export class StatisticHeaderComponent {
  @Input() title!: string;
  @Input() menuState!: boolean;
  @Output() menuStateChange = new EventEmitter<boolean>();
  @Output() onPrintPDF = new EventEmitter<boolean>();
  faBurger = faBurger;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faArrowDown = faArrowDown;
  toggleMenu() {
    this.menuState = !this.menuState;
    this.menuStateChange.emit(this.menuState);
  }
  downloadPDF() {
    this.onPrintPDF.emit(true);
  }
}
