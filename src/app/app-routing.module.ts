import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductComponent } from "./components/product/product.component";
import { ReportComponent } from "./components/report/report.component";
import { VendorAddEditComponent } from "./components/vendor/vendor-add-edit/vendor-add-edit.component";
import { VendorComponent } from "./components/vendor/vendor.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "vendors" },
  { path: "vendors", component: VendorComponent },
  { path: "vendors/add", component: VendorAddEditComponent },
  { path: "vendors/edit/:id", component: VendorAddEditComponent },
  { path: "products", component: ProductComponent },
  { path: "reports", component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
