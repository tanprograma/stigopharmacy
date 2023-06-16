import { Component } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faPerson, faUser, faRefresh } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  faHouse = faHouse;
  faPerson = faUser;
  faRefresh = faRefresh;
  title = 'stigopharmacy';
  year = new Date().getUTCFullYear();
  selected!: HTMLAnchorElement;
  select(x: HTMLAnchorElement) {
    this.selected = x;
  }
}
