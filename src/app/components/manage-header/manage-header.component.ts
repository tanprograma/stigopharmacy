import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-manage-header',
  templateUrl: './manage-header.component.html',
  styleUrls: ['./manage-header.component.css'],
})
export class ManageHeaderComponent {
  @Input() options!: string[];
  @Input() selected!: string;
  @Output() selectedChange = new EventEmitter<string>();
  select(option: string) {
    this.selectedChange.emit(option);
  }
}
