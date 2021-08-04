import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";

import { VendorComponent } from "./components/vendor/vendor.component";
//import { ProductComponent } from "./components/product/product.component";
import { ReportComponent } from "./components/report/report.component";

import { VendorServicesService } from "./services/vendor/vendor-services.service";
import { VendorAddEditComponent } from "./components/vendor/vendor-add-edit/vendor-add-edit.component";
//import { ProductAddEditComponent } from './components/product/product-add-edit/product-add-edit.component';
import { CategoryComponent } from "./components/category/category.component";
import { CategoryAddEditComponent } from "./components/category/category-add-edit/category-add-edit.component";
@NgModule({
  declarations: [
    AppComponent,
    VendorComponent,
    ReportComponent,
    VendorAddEditComponent,
    CategoryComponent,
    CategoryAddEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [VendorServicesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
