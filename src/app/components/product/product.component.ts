import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "src/app/models/product/product.model";
import { ProductService } from "src/app/services/product/product.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["partNumber", "partName", "vendor", "action"];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe((resp) => {
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

  deleteProduct(item, i) {
    this.productService.deleteProduct(item._id).subscribe((resp) => {
      this.getProducts();
    });
  }
}
