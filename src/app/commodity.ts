export interface Commodity {
  name?: string;
  inventory_level: number;
  active?: boolean;
  units: { name: string; quantity: number }[];
  _id?: string;
}
