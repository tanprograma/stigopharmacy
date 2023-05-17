import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-formx',
  templateUrl: './admin-formx.component.html',
  styleUrls: ['./admin-formx.component.css'],
})
export class AdminFormxComponent implements OnInit {
  @Input() items: any;
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
  }
}
