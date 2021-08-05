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
import { Metal } from "src/app/models/metals/metal.model";
import { MetalService } from "src/app/services/metal/metal.service";

@Component({
  selector: "app-metals",
  templateUrl: "./metals.component.html",
  styleUrls: ["./metals.component.scss"],
})
export class MetalsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["_id", "metalName", "thickness", "action"];
  dataSource: MatTableDataSource<Metal>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private metalService: MetalService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getMetal();
  }

  getMetal() {
    this.metalService.getMetals().subscribe((resp) => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteVendor(item, i) {
    console.log(item._id);
    this.metalService.deleteMetal(item._id).subscribe((resp) => {
      this.getMetal();
    });
  }
}
