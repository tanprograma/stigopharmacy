import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
})
export class LogoComponent {
  @Input() logo!: string;
}
