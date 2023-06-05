import { Component } from '@angular/core';
import { Unit } from 'src/app/unit';
import { Output, EventEmitter } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';
@Component({
  selector: 'app-import-units',
  templateUrl: './import-units.component.html',
  styleUrls: ['./import-units.component.css'],
})
export class ImportUnitsComponent {
  interval!: any;

  constructor(private unitService: UnitService) {}
  ngOnInit(): void {
    this.getUnits();
  }
  message: string = 'loading...';
  units: Unit[] = [];
  unit: string = '';
  loading: boolean = false;
  prescription: Unit = {
    name: '',
  };
  items: Unit[] = [];
  load(isLoading: boolean) {
    this.loading = isLoading;
  }
  add(x: HTMLInputElement) {
    if (!x.files) return;
    const reader = new FileReader();
    if (x.files.length) {
      reader.readAsText(x.files[0]);
      reader.onload = this.parseUnits;
    }
  }
  parseUnits = (e: any) => {
    const data: string = e.target.result;
    const x = data
      .split('\r\n')
      .slice(1)
      .map((i) => {
        return { name: i.split(',')[0] };
      })
      .filter((i) => {
        return i.name.length != 0;
      });
    this.createUnits(x);
  };
  createUnits(x: Unit[]) {
    const filtered: any = [];
    x.forEach((i) => {
      const found = this.units.find((v) => {
        return v.name == i.name?.toUpperCase();
      });
      if (!found) {
        filtered.push(i);
      }
    });

    if (!filtered.length) return;

    this.loading = true;
    this.unitService.createUnits(filtered).subscribe((i) => {
      console.log({ i });
      this.items.splice(0, 0, ...i);
      this.units.splice(0, 0, ...i);
      this.loading = false;
    });
  }
  getUnits() {
    if (this.unitService.units.length) {
      this.units = this.unitService.units;
      return;
    }
    this.unitService.getUnits().subscribe((i) => {
      this.unitService.units = i;
      this.units = i;
    });
  }
}
