import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/client';
import { Output, EventEmitter } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css'],
})
export class CreateClientComponent implements OnInit {
  interval!: any;

  constructor(private clientService: ClientsService) {}
  ngOnInit(): void {
    this.iniatialize();
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
  add() {
    if (!this.prescription.name?.length) return;
    const found = this.clients.find((i) => {
      return i.name == this.prescription.name?.toUpperCase();
    });
    if (!found) {
      console.log('created it: product was unavailable');
      console.log({ found, name: this.prescription.name });
      this.items.splice(0, 0, { name: this.prescription.name.toUpperCase() });
      this.clients.splice(0, 0, { name: this.prescription.name.toUpperCase() });
      return;
    }

    console.log('cant creat it: product available');
    console.log({ found, name: this.prescription.name });
  }
  getClients() {
    if (this.clientService.clients.length) {
      this.clients = this.clientService.clients;
      return;
    }
    this.loading = true;
    this.clientService.getClients().subscribe((i) => {
      this.clients = i;
      this.clientService.clients = i;
      this.loading = false;
    });
  }
  iniatialize() {
    this.getClients();
  }
  stopLoading() {
    this.loading = false;
    clearInterval(this.interval);
  }
  loadStatus() {
    this.loading = true;
  }
}
