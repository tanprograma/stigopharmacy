export interface Rquest {
  host?: string;
  isIssued?: boolean;

  _id?: any;
  client?: string;
  date?: any;
  commodities: {
    inspected?: boolean;
    commodity?: string;
    requested?: number;
    issued?: number;
    unit?: string;
  }[];
}
