import { Component, OnInit } from '@angular/core';
import { Outlet } from 'src/app/outlet';
import { OutletService } from 'src/app/services/outlet.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  stores: { dropdown_item: string; dropdown_link: string }[] = [];
  constructor(
    private storeService: OutletService,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.dataService.loadNavigation(this.navigation);
  }

  navigation: {
    dropdown_title: string;
    dropdown_list: { dropdown_item: string; dropdown_link: string }[];
  }[] = [
    {
      dropdown_title: 'manage',
      dropdown_list: [
        { dropdown_item: 'unit', dropdown_link: '/manage/unit' },
        { dropdown_item: 'commodity', dropdown_link: '/manage/commodity' },
        { dropdown_item: 'client', dropdown_link: '/manage/client' },
        { dropdown_item: 'store', dropdown_link: '/manage/store' },
        { dropdown_item: 'medicine', dropdown_link: '/manage/medicine' },
      ],
    },
  ];
}
