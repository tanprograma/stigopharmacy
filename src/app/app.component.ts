import { Component } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faPerson, faUser, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = environment.title;
  faHouse = faHouse;
  faPerson = faUser;
  faRefresh = faRefresh;

  year = new Date().getUTCFullYear();
  selected!: HTMLAnchorElement;
  select(x: HTMLAnchorElement) {
    this.selected = x;
  }
}
