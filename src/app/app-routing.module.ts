import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryAddEditComponent } from "./components/category/category-add-edit/category-add-edit.component";
import { CategoryComponent } from "./components/category/category.component";
import { MetalsAddEditComponent } from "./components/metals/metals-add-edit/metals-add-edit.component";
import { MetalsComponent } from "./components/metals/metals.component";
import { ProductAddEditComponent } from "./components/product/product-add-edit/product-add-edit.component";
import { ProductComponent } from "./components/product/product.component";
import { ReportMasterComponent } from "./components/report-master/report-master.component";
import { ReportGeneratorComponent } from "./components/report/report-generator/report-generator.component";
import { ReportComponent } from "./components/report/report.component";
import { VendorAddEditComponent } from "./components/vendor/vendor-add-edit/vendor-add-edit.component";
import { VendorComponent } from "./components/vendor/vendor.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "reports" },
  { path: "vendors", component: VendorComponent },
  { path: "vendors/add", component: VendorAddEditComponent },
  { path: "vendors/edit/:id", component: VendorAddEditComponent },
  { path: "category", component: CategoryComponent },
  { path: "category/add", component: CategoryAddEditComponent },
  { path: "category/edit/:id", component: CategoryAddEditComponent },
  { path: "metal", component: MetalsComponent },
  { path: "metal/add", component: MetalsAddEditComponent },
  { path: "metal/edit/:id", component: MetalsAddEditComponent },
  { path: "products", component: ProductComponent },
  { path: "products/add", component: ProductAddEditComponent },
  { path: "products/edit/:id", component: ProductAddEditComponent },
  { path: "reportmaster", component: ReportMasterComponent },
  { path: "reports", component: ReportComponent },
  { path: "reports/add", component: ReportGeneratorComponent },
  { path: "reports/edit/:id", component: ReportGeneratorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
