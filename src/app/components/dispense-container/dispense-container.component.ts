import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispense-container',
  templateUrl: './dispense-container.component.html',
  styleUrls: ['./dispense-container.component.css'],
})
export class DispenseContainerComponent implements OnInit {
  message: string = 'loading';

  loading!: boolean;
  load(isLoading: boolean) {
    this.loading = isLoading;
  }
  ngOnInit(): void {}
}
