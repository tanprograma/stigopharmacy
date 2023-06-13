import { Inventory } from '../inventory';
function genSN(inventory: Inventory[]) {
  return inventory.map((i, index) => {
    const y: Inventory = destructureInventory(i);
    y.sn = index + 1;
    return y;
  });
}
export class Statistic {
  // the current statistic
  statistics!: Inventory[];
  currentStatistics!: Inventory[];
  constructor(private inventory: Inventory[]) {
    this.statistics = inventory;
    this.currentStatistics = genSN(inventory);
  }
  clearFilter(statistics: Inventory[]) {
    statistics = this.currentStatistics;
  }
  restoreStatistics(statistics: Inventory[]) {
    this.currentStatistics = genSN(this.statistics);
    statistics = this.currentStatistics;
  }
  search(statistics: Inventory[], term: string) {
    const s: Inventory[] = statistics.filter((i) => {
      return i.commodity == term;
    });
    statistics = genSN(s);
  }
  // filter quantity
  // get gt
  // getGt() {
  //   ret;
  // }
  // filters the inventory by date
  filterInventoryByDate(start: Date, end: Date) {
    const stats: Inventory[] = this.inventory.map((i) => {
      let inventory = this.destructureInventory(i);
      inventory.dispensed = this.filterTransactionsByDate(
        { start, end },
        inventory.dispensed
      );
      inventory.issued = this.filterTransactionsByDate(
        { start, end },
        inventory.issued
      );
      inventory.received = this.filterTransactionsByDate(
        { start, end },
        inventory.received
      );
      return inventory;
    });
    this.currentStatistics = genSN(stats);
  }
  // filters the transactions by date
  filterTransactionsByDate(date: { start: Date; end: Date }, item: any) {
    return item.filter((i: any) => {
      return i.date >= date.start.valueOf() && i.date <= date.end.valueOf();
    });
  }
  // produces something that dont affect statistics
  destructureInventory(i: Inventory) {
    let {
      active,
      commodity,
      outlet,
      unit,
      unit_value,
      dispensed,
      issued,
      isWarehouse,
      received,
      beginning,
      inventory_level,
    } = i;
    return {
      active,
      commodity,
      outlet,
      unit,
      unit_value,
      dispensed,
      issued,
      isWarehouse,
      received,
      beginning,
      inventory_level,
    };
  }
  // reduce sum
  static reduceSum(arr: any) {
    return arr
      .map((i: any) => {
        return i.quantity;
      })
      .reduce((a: number, b: number) => {
        return a + b;
      }, 0);
  }
}
function destructureInventory(i: Inventory) {
  let {
    active,
    commodity,
    outlet,
    unit,
    unit_value,
    dispensed,
    issued,
    isWarehouse,
    received,
    beginning,
    inventory_level,
  } = i;
  return {
    active,
    commodity,
    outlet,
    unit,
    unit_value,
    dispensed,
    issued,
    isWarehouse,
    received,
    beginning,
    inventory_level,
  };
}
