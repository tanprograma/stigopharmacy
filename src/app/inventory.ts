import { OutletContext } from '@angular/router';

export interface Inventory {
  _id?: any;
  commodity: any;
  outlet?: any;
  beginning: number;
  dispensed: {
    date: any;
    unit: string;
    quantity: number;
    transaction: any;
  }[];
  received: { date: any; unit: string; quantity: number; transaction: any }[];
  issued: { date: any; unit: string; quantity: number; transaction: any }[];
}
