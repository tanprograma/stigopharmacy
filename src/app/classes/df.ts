import { Prescription } from '../prescription';
export class DF {
  constructor(private data: string, private initial_date: string) {}
  getArray() {
    return this.data.split('\r\n').map((i) => {
      return i.split(',');
    });
  }
  getMaximumLength(data: string[][]) {
    const mapped = data.map((i) => {
      return i.length;
    });

    return Math.max(...mapped);
  }
  getRawPrescription() {
    const list = this.getArray();
    // console.log({ rawlist: list });
    const max = this.getMaximumLength(list);
    const mappedList = [];
    for (let i = 1; i < max; i++) {
      const inner: any = [];
      list.forEach((x) => {
        const med = x[0];
        const quantity = Number(x[i]) ? Number(x[i]) : 0;
        if (!quantity) return;
        inner.push({
          commodity: med,
          requested: quantity,
          issued: quantity,
          unit: '',
        });
      });
      mappedList.push(inner);
    }
    console.log({ mappedList });
    return mappedList;
  }
  getPrescriptions() {
    const initial_date = new Date(this.initial_date).getDate();
    const list = this.getRawPrescription();

    return list.map((i, index) => {
      let my_date: Date = new Date(this.initial_date);
      my_date.setDate(initial_date + index + 1);
      const prescription: Prescription = {
        host: '',
        client: '',
        items: i,
        date: my_date.valueOf(),
      };

      return prescription;
    });
  }
}
