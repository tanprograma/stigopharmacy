import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.css'],
})
export class AdvertComponent {
  @Input() message!: string;
}
