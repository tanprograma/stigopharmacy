import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { faBarChart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-homepage-statistic',
  templateUrl: './homepage-statistic.component.html',
  styleUrls: ['./homepage-statistic.component.css'],
})
export class HomepageStatisticComponent {
  @Input() title: any;
  @Input() quantity: any;
  icon = faBarChart;
}
