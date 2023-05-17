import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { OutletComponent } from './components/outlet/outlet.component';
import { StatisticsAllComponent } from './components/statistics-all/statistics-all.component';
import { ManageClientComponent } from './components/manage-client/manage-client.component';
import { ManageUnitComponent } from './components/manage-unit/manage-unit.component';
import { ManageMedicineComponent } from './components/manage-medicine/manage-medicine.component';
import { ManageStoreComponent } from './components/manage-store/manage-store.component';
import { ManageCommodityComponent } from './components/manage-commodity/manage-commodity.component';
import { ManageStockComponent } from './components/manage-stock/manage-stock.component';
import { AdminComponent } from './components/admin/admin.component';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomepageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'outlet/:outlet', component: OutletComponent },

  { path: 'manage/unit', component: ManageUnitComponent },
  { path: 'manage/commodity', component: ManageCommodityComponent },
  { path: 'manage/store', component: ManageStoreComponent },
  { path: 'manage/client', component: ManageClientComponent },
  { path: 'manage/medicine', component: ManageMedicineComponent },
  { path: 'manage/stock', component: ManageStockComponent },
  // { path: 'statistics/:outlet', component: ShopStatisticsComponent },
  { path: 'statistics', component: StatisticsAllComponent },
  // { path: 'statistics/:outlet', component: ShopStatisticsComponent },
];
