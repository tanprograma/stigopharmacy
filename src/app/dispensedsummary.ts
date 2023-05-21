export interface DispensedSummary {
  commodity?: string;
  dispensed: {
    date: any;
    unit: string;
    quantity: number;
    transaction: any;
  }[];
}
