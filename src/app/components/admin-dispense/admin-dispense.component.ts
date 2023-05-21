import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/client';
import { Outlet } from 'src/app/outlet';
import { Prescription } from 'src/app/prescription';
import { ClientService } from 'src/app/services/client.service';
import { OutletService } from 'src/app/services/outlet.service';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-admin-dispense',
  templateUrl: './admin-dispense.component.html',
  styleUrls: ['./admin-dispense.component.css'],
})
export class AdminDispenseComponent implements OnInit {
  constructor(
    private clientService: ClientService,
    private storeService: OutletService
  ) {}
  @Input() prescription?: Prescription[];

  @Input() title!: string;
  host: string = '';
  @Output() create = new EventEmitter<{
    host: string;
    date: string;
    client: string;
    filelist: FileList;
  }>();
  clients: Client[] = [];
  client: string = '';
  date: string = '';

  outlets: Outlet[] = [];
  ngOnInit(): void {
    if (!this.clientService.clients.length) {
      this.clientService.getClients().subscribe((i) => {
        this.clientService.clients = i;
        this.clients = i;
      });
    }
    if (!this.storeService.stores.length) {
      this.storeService.getOutlets().subscribe((i) => {
        this.storeService.stores = i;
        this.outlets = i.filter((x) => {
          return !x.isSupplier == true || !x.isWarehouse == true;
        });
      });
    }
    this.clients = this.clientService.clients;
    this.outlets = this.storeService.stores.filter((x) => {
      return !x.isSupplier == true && !x.isWarehouse == true;
    });
  }
  collapsed: boolean = true;
  collapse() {
    this.collapsed = !this.collapsed;
  }
  add(x: HTMLInputElement) {
    // this.parseFile(x.files[0]);
    if (x.files != null) {
      if (x?.files.length) {
        console.log({
          emit: {
            host: this.host,
            date: this.date,
            client: this.client,
            filelist: x.files,
          },
        });
        this.create.emit({
          host: this.host,
          date: this.date,
          client: this.client,
          filelist: x.files,
        });
        return;
      }
      console.log('the files are empty');
      return;
    }

    // if (x.files != null) {
    //   if (x?.files.length) {
    //     this.parseFile(x.files);
    //     return;
    //   }
    //   console.log('the files are empty');
    //   return;
    // }
  }
}
