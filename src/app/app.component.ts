import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'stigopharmacy';
  dropdown_title = 'lorem';
  dropdown_list: { dropdown_link: string; dropdown_item: string }[] = [
    { dropdown_item: 'lorem', dropdown_link: '/lorem' },
    { dropdown_item: 'lorem', dropdown_link: '/lorem' },
    { dropdown_item: 'lorem', dropdown_link: '/lorem' },
    { dropdown_item: 'lorem', dropdown_link: '/lorem' },
  ];
}
