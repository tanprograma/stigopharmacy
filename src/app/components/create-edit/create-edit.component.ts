import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css'],
})
export class CreateEditComponent {
  @Input() title: any;
  @Input() resources!: { name: string; _id?: string }[];
  @Input() submit_title: any;
  @Output() onSubmit = new EventEmitter<{ name: string; _id?: string }>();
  submit(item: { name: string; _id?: string }) {
    this.onSubmit.emit(item);
  }
}
