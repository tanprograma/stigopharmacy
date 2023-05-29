import { Routes } from '@angular/router';
import { OutletContainerComponent } from './components/outlet-container/outlet-container.component';
import { DispenseComponent } from './components/dispense/dispense.component';
import { IssueComponent } from './components/issue/issue.component';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { StatisticsContainerComponent } from './components/statistics-container/statistics-container.component';
import { DispenseContainerComponent } from './components/dispense-container/dispense-container.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { CreateMedicineComponent } from './components/create-medicine/create-medicine.component';
import { CreateStoreComponent } from './components/create-store/create-store.component';
import { ImportStoresComponent } from './components/import-stores/import-stores.component';
import { ImportMedicinesComponent } from './components/import-medicines/import-medicines.component';
import { ImportDispensedComponent } from './components/import-dispensed/import-dispensed.component';
import { ImportClientsComponent } from './components/import-clients/import-clients.component';

import { StatisticSummaryComponent } from './components/statistic-summary/statistic-summary.component';
import { TimeoutComponent } from './components/timeout/timeout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/outlet/dispense' },
  {
    path: 'outlet',

    component: OutletContainerComponent,
    children: [
      { path: 'dispense', component: DispenseContainerComponent },
      { path: 'issue', component: IssueComponent },
    ],
  },
  {
    path: 'timeout',

    component: TimeoutComponent,
  },
  {
    path: 'admin',

    component: AdminContainerComponent,
    children: [
      { path: 'client/create', component: CreateClientComponent },
      { path: 'medicine/create', component: CreateMedicineComponent },
      { path: 'store/create', component: CreateStoreComponent },
      { path: 'stores/import', component: ImportStoresComponent },
      { path: 'medicines/import', component: ImportMedicinesComponent },
      { path: 'clients/import', component: ImportClientsComponent },
      { path: 'dispensed/import', component: ImportDispensedComponent },
    ],
  },
  {
    path: 'statistics',
    component: StatisticsContainerComponent,
    children: [{ path: 'summary', component: StatisticSummaryComponent }],
  },
];
