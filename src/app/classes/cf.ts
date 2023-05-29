import { Client } from '../client';
import { ClientsService } from '../services/clients.service';
import { Injectable } from '@angular/core';
@Injectable()
export class Cf {
  processed_data: Client[] = [];
  constructor(
    private raw_data: FileList,
    private clientService: ClientsService
  ) {}
  getArray() {
    const reader = new FileReader();
    reader.readAsText(this.raw_data[0]);
    reader.onload = this.readFile;
  }
  readFile = (e: any) => {
    const data: string = e.target.results;
    this.processed_data = data
      .split('\r\n')
      .map((i) => {
        return { name: i.split(',')[0] };
      })
      .filter((i) => {
        return i.name.length != 0;
      });
  };
  get clients() {
    return this.processed_data;
  }
  createClients(data: Client[]) {
    this.clientService.createClients(data).subscribe();
  }
  static importClients() {}
}
