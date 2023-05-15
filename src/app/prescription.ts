export interface Prescription {
  host: string;
  isIssued?: boolean;

  _id?: any;
  client: string;
  date?: any;
  items: {
    inspected?: boolean;
    commodity?: string;
    requested: number;
    issued?: number;
    unit?: string;
  }[];
}
