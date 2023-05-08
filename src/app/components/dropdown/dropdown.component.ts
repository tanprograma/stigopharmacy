import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @Input() dropdown_list!: { dropdown_link: string; dropdown_item: string }[];
  @Input() dropdown_title: any;
}
