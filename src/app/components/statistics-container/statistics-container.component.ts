import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/store';

@Component({
  selector: 'app-statistics-container',
  templateUrl: './statistics-container.component.html',
  styleUrls: ['./statistics-container.component.css'],
})
export class StatisticsContainerComponent implements OnInit {
  stores: Store[] = [];
  constructor(private storeService: StoreService) {}
  ngOnInit(): void {
    this.getStores();
  }
  getStores() {
    this.storeService.getStores().subscribe((i) => {
      this.stores = i;
    });
  }
  genLink(name: any) {
    return `/statistics/outlet/${name}`;
  }
}
