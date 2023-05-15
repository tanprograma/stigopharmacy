import { Injectable } from '@angular/core';
import { Inventory } from '../inventory';
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor() {}
  statistics: Inventory[] = [];
}
