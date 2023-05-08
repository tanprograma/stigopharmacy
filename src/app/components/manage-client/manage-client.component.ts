import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

import { DataService } from 'src/app/services/data.service';
import { Client } from 'src/app/client';
@Component({
  selector: 'app-manage-client',
  templateUrl: './manage-client.component.html',
  styleUrls: ['./manage-client.component.css'],
})
export class ManageClientComponent {
  constructor(
    private clientService: ClientService,
    private dataService: DataService
  ) {}
  activity!: string;
  clients: Client[] = [];
  ngOnInit(): void {
    this.activity = 'create';
    this.getStores();
  }
  setActivity(option: string) {
    this.activity = option;
  }
  getStores() {
    if (!this.clientService.clients.length) {
      this.clientService.getClients().subscribe((clients) => {
        console.log(clients);
        this.clients = clients;
        this.clientService.clients = clients;
      });
      return;
    }
    this.clients = this.clientService.clients;
  }
  createClient(item: Client) {
    this.clientService.postClient(item).subscribe((client) => {
      this.clientService.clients.push(client);
    });
  }
}
