import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { VendorServicesService } from "./../../services/vendor/vendor-services.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Vendor } from "src/app/models/vendor/vendor.model";

@Component({
  selector: "app-vendor",
  templateUrl: "./vendor.component.html",
  styleUrls: ["./vendor.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class VendorComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    "compName",
    "gstNo",
    "panNo",
    "mobileNumber",
    "action",
  ];
  dataSource: MatTableDataSource<Vendor>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private vendorService: VendorServicesService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getVendors();
  }

  getVendors() {
    this.vendorService.getVendors().subscribe((resp) => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteVendor(id) {
    console.log(id);
    this.vendorService.deleteVendor(id).subscribe((resp) => {
      this.getVendors();
    });
  }
}
