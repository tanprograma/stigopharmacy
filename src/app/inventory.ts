export interface Inventory {
  sn?: number;
  commodity?: string;
  outlet?: string;
  beginning: number;
  unit?: string;
  unit_value?: number;
  active?: boolean;
  inventory_level?: number;
  isWarehouse?: boolean;
  dispensed: { date?: number; quantity?: number; client?: string }[];
  issued: { date?: number; quantity?: number; client?: string }[];
  received: { date?: number; quantity?: number; client?: string }[];
}
