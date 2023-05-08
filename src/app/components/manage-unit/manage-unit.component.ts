import { Component, OnInit } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';
import { DataService } from 'src/app/services/data.service';
import { Unit } from 'src/app/unit';
@Component({
  selector: 'app-manage-unit',
  templateUrl: './manage-unit.component.html',
  styleUrls: ['./manage-unit.component.css'],
})
export class ManageUnitComponent {
  constructor(
    private unitService: UnitService,
    private dataService: DataService
  ) {}
  activity!: string;
  units: Unit[] = [];
  ngOnInit(): void {
    this.activity = 'create';
    this.getUnits();
  }
  setActivity(option: string) {
    this.activity = option;
  }
  getUnits() {
    if (!this.unitService.units.length) {
      this.unitService.getUnits().subscribe((units) => {
        console.log(units);
        this.units = units;
        this.unitService.units = units;
      });
      return;
    }
    this.units = this.unitService.units;
  }
  createUnit(item: Unit) {
    this.unitService.postUnit(item).subscribe((unit) => {
      console.log(unit);

      this.unitService.units.push(unit);
    });
  }
}
