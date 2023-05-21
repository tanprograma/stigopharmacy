import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-stock',
  templateUrl: './download-stock.component.html',
  styleUrls: ['./download-stock.component.css'],
})
export class DownloadStockComponent implements OnInit {
  title = 'weekly stock report';
  date!: string;
  print: boolean = false;
  ngOnInit(): void {
    this.setDate();
  }
  setDate() {
    const date = new Date();
    this.date = `${date.getUTCDate()}-${
      date.getUTCMonth() + 1
    }-${date.getUTCFullYear()}`;
  }
  downloadCSV() {
    this.print = !this.print;

    console.log('download csv');
  }
  downloadPDF() {
    console.log('download pdf');
    window.print();
  }
}
