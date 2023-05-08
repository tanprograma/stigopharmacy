export interface Commodity {
  name?: string;
  inventory_level: number;
  units: { name: string; quantity: number }[];
  _id?: string;
}
