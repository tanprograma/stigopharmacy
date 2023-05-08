import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Outlet } from 'src/app/outlet';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css'],
})
export class CreateStoreComponent {
  @Input() title: any;
  @Input() resources!: { name: string; _id?: string }[];
  @Input() submit_title: any;
  @Output() onSubmit = new EventEmitter<Outlet>();
  submit(item: Outlet) {
    this.onSubmit.emit(item);
  }
}
