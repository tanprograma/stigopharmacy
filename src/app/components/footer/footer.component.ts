import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @Input() footer!: string;
  year!: string;
  ngOnInit(): void {
    this.year = String(new Date().getFullYear());
  }
}
