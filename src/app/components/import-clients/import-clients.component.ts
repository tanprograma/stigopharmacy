import { Component } from '@angular/core';
import { Client } from 'src/app/client';
import { Output, EventEmitter } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-import-clients',
  templateUrl: './import-clients.component.html',
  styleUrls: ['./import-clients.component.css'],
})
export class ImportClientsComponent {
  interval!: any;

  constructor(private clientService: ClientsService) {}
  ngOnInit(): void {
    this.getClients();
  }
  message: string = 'loading...';
  clients: Client[] = [];
  client: string = '';
  loading: boolean = false;
  prescription: Client = {
    name: '',
  };
  items: Client[] = [];
  load(isLoading: boolean) {
    this.loading = isLoading;
  }
  add(x: HTMLInputElement) {
    if (!x.files) return;
    const reader = new FileReader();
    if (x.files.length) {
      reader.readAsText(x.files[0]);
      reader.onload = this.parseClients;
    }
  }
  parseClients = (e: any) => {
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
    this.createClients(x);
  };
  createClients(x: Client[]) {
    const filtered: any = [];
    x.forEach((i) => {
      const found = this.clients.find((v) => {
        return v.name == i.name?.toUpperCase();
      });
      if (!found) {
        filtered.push(i);
      }
    });

    if (!filtered.length) return;

    this.loading = true;
    this.clientService.createClients(filtered).subscribe((i) => {
      console.log({ i });
      this.items.splice(0, 0, ...i);
      this.clients.splice(0, 0, ...i);
      this.loading = false;
    });
  }
  getClients() {
    if (this.clientService.clients.length) {
      this.clients = this.clientService.clients;
      return;
    }
    this.clientService.getClients().subscribe((i) => {
      this.clientService.clients = i;
      this.clients = i;
    });
  }
}
