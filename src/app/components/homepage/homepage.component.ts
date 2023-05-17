import { Component, OnInit } from '@angular/core';
import { Outlet } from 'src/app/outlet';
import { OutletService } from 'src/app/services/outlet.service';
import { Observable, of } from 'rxjs';
import { Prescription } from 'src/app/prescription';
import { Medicine } from 'src/app/medicine';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  stores: Observable<Outlet[]> = this.storeService.getOutlets();
  dispensed: { store: string; records: number }[] = [];
  received: { store: string; records: number }[] = [];
  requested: { store: string; records: number }[] = [];
  requests: Prescription[] = [];

  medicines: Medicine[] = [];
  message: string = 'initializing....';
  link: any;
  constructor(
    private storeService: OutletService,
    private prescriptionService: PrescriptionService,
    private requestService: RequestService
  ) {}
  ngOnInit(): void {
    this.getStores();
    setTimeout(() => {
      if (
        !this.dispensed.length &&
        !this.received.length &&
        !this.requested.length
      ) {
        this.link = '/admin';
      }
    }, 10000);
  }
  getDispensed() {
    const stores = this.storeService.stores.filter((i) => {
      return !i.isSupplier == true;
    });

    stores.forEach((i) => {
      const record = this.prescriptionService.sortDispensed(i._id);
      this.dispensed.push({ store: i.name, records: record.length });
    });
  }
  getRequests() {
    const stores = this.storeService.stores.filter((i) => {
      return !i.isSupplier == true;
    });

    stores.forEach((i) => {
      const record = this.requestService.sortRequests(i._id);
      this.requested.push({ store: i.name, records: record.length });
    });
  }
  getReceived() {
    const stores = this.storeService.stores.filter((i) => {
      return !i.isSupplier == true;
    });

    stores.forEach((i) => {
      const record = this.requestService.sortReceived(i._id);
      this.received.push({ store: i.name, records: record.length });
    });
  }
  getSum(item: { store: string; records: number }[]) {
    return item
      .map((i) => {
        return i.records;
      })
      .reduce((a: number, b: number) => {
        return a + b;
      }, 0);
  }
  getStores() {
    if (!this.storeService.stores.length) {
      this.stores.subscribe((stores) => {
        const strs = stores.filter((i) => {
          return !i.isSupplier;
        });
        this.loadNavigation(strs);
        this.storeService.stores = stores;
        this.prescriptionService.getPrescriptions().subscribe((i) => {
          console.log({ dispensed: i.length });
          this.prescriptionService.dispensed = i;
          this.getDispensed();
          this.getReceived();
          this.getRequests();
        });
      });
      return;
    }
    const outlets = this.storeService.stores.filter((i) => {
      return !i.isSupplier == true;
    });
    this.getDispensed();
    this.getReceived();
    this.getRequests();
    this.loadNavigation(outlets);
  }
  loadNavigation(stores: Outlet[]) {
    const storesLinks = stores.map((item) => {
      return {
        dropdown_item: item.name,
        dropdown_link: `/outlet/${item.name}`,
      };
    });
    let statLinks = stores
      .filter((i) => {
        return !i.isSupplier;
      })
      .map((item) => {
        return {
          dropdown_item: item.name,
          dropdown_link: `/statistics/${item.name}`,
        };
      });
    statLinks = [
      {
        dropdown_item: 'all',
        dropdown_link: `/statistics/`,
      },
      ...statLinks,
    ];

    this.navigation.push({
      dropdown_title: 'outlets',
      dropdown_list: storesLinks,
    });
    this.navigation.push({
      dropdown_title: 'statistics',
      dropdown_list: statLinks,
    });
  }
  navigation: {
    dropdown_title: string;
    dropdown_list: { dropdown_item: string; dropdown_link: string }[];
  }[] = [
    {
      dropdown_title: 'admin',
      dropdown_list: [
        { dropdown_item: 'create units', dropdown_link: '/admin' },
        { dropdown_item: 'create stores', dropdown_link: '/admin' },
        { dropdown_item: 'create clients', dropdown_link: '/admin' },
        { dropdown_item: 'create medicines', dropdown_link: '/admin' },
        { dropdown_item: 'add begginning stock', dropdown_link: '/admin' },
      ],
    },
    {
      dropdown_title: 'manage',
      dropdown_list: [
        { dropdown_item: 'unit', dropdown_link: '/manage/unit' },
        { dropdown_item: 'commodity', dropdown_link: '/manage/commodity' },
        { dropdown_item: 'client', dropdown_link: '/manage/client' },
        { dropdown_item: 'store', dropdown_link: '/manage/store' },
        { dropdown_item: 'medicine', dropdown_link: '/manage/medicine' },
        { dropdown_item: 'stock', dropdown_link: '/manage/stock' },
      ],
    },
  ];

  redirect(x: HTMLAnchorElement) {
    this.openAdminPane(x);
    return () => {
      console.log('clicked');
    };
  }
  openAdminPane(x: HTMLAnchorElement) {
    this.message = 'redirecting to admin page...';

    setTimeout(() => {
      x.click();
    }, 700);
  }
}
