import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css'],
})
export class AdminMainComponent {
  message: string = 'loading';

  loading!: boolean;
  load(isLoading: boolean) {
    this.loading = isLoading;
  }
}
