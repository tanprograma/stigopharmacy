import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DbService } from './services/db.service';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { LogoComponent } from './components/logo/logo.component';
import { FooterComponent } from './components/footer/footer.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { HomepageComponent } from './components/homepage/homepage.component';

import { HomepageStatisticComponent } from './components/homepage-statistic/homepage-statistic.component';
import { OutletComponent } from './components/outlet/outlet.component';
import { DispenseComponent } from './components/dispense/dispense.component';
import { PrescriptionComponent } from './components/prescription/prescription.component';
import { IssueFormComponent } from './components/issue-form/issue-form.component';
import { IssueComponent } from './components/issue/issue.component';
import { RequestItemComponent } from './components/request-item/request-item.component';

import { ManageUnitComponent } from './components/manage-unit/manage-unit.component';
import { CreateEditComponent } from './components/create-edit/create-edit.component';
import { ManageCommodityComponent } from './components/manage-commodity/manage-commodity.component';
import { AddCommodityComponent } from './components/add-commodity/add-commodity.component';
import { ManageStoreComponent } from './components/manage-store/manage-store.component';
import { ManageClientComponent } from './components/manage-client/manage-client.component';
import { ManageStrengthComponent } from './components/manage-strength/manage-strength.component';
import { ManageMedicineComponent } from './components/manage-medicine/manage-medicine.component';
import { ManageHeaderComponent } from './components/manage-header/manage-header.component';
import { CreateStoreComponent } from './components/create-store/create-store.component';
import { RequestComponent } from './components/request/request.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { StatisticsAllComponent } from './components/statistics-all/statistics-all.component';
import { IssueFormRequestComponent } from './components/issue-form-request/issue-form-request.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    FooterComponent,
    DropdownComponent,
    HomepageComponent,
    HomepageStatisticComponent,
    OutletComponent,
    DispenseComponent,
    PrescriptionComponent,
    IssueFormComponent,
    IssueComponent,
    RequestItemComponent,

    ManageUnitComponent,
    CreateEditComponent,
    ManageCommodityComponent,
    AddCommodityComponent,
    ManageStoreComponent,
    ManageClientComponent,
    ManageStrengthComponent,
    ManageMedicineComponent,
    ManageHeaderComponent,
    CreateStoreComponent,
    RequestComponent,
    StatisticsComponent,
    StatisticsAllComponent,
    IssueFormRequestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(DbService, {
    //   dataEncapsulation: false,
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
