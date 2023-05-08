import { OutletContext } from '@angular/router';

export interface Inventory {
  id: any;
  commodity: any;
  outlet: any;
  beginning: number;
  dispensed: {
    date: any;

    quantity: number;
    transaction: any;
  }[];
  received: { date: any; quantity: number; transaction: any }[];
  issued: { date: any; quantity: number; transaction: any }[];
}
