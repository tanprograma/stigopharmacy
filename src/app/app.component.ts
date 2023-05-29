import { Component } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  faHouse = faHouse;
  title = 'stigopharmacy';
  year = new Date().getUTCFullYear();
  selected!: HTMLAnchorElement;
  select(x: HTMLAnchorElement) {
    this.selected = x;
  }
}
