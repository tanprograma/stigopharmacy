import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent implements OnInit {
  @Input() items!: { name: string }[];
  @Input() title!: string;
  @Output() create = new EventEmitter<FileList>();

  ngOnInit(): void {
    this.items = this.items ? this.items : [];
  }
  collapsed: boolean = true;
  collapse() {
    this.collapsed = !this.collapsed;
  }
  add(x: HTMLInputElement) {
    // this.parseFile(x.files[0]);
    if (x.files != null) {
      if (x?.files.length) {
        this.create.emit(x.files);
        return;
      }
      console.log('the files are empty');
      return;
    }

    // if (x.files != null) {
    //   if (x?.files.length) {
    //     this.parseFile(x.files);
    //     return;
    //   }
    //   console.log('the files are empty');
    //   return;
    // }
  }
}
