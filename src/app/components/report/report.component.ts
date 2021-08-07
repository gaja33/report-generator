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
import { ReportGenerator } from "src/app/models/report-generator/report-generator.model";
import { ReportGeneratorService } from "src/app/services/report-generator/report-generator.service";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["reportNo", "skiDCNo", "toAddress", "action"];
  dataSource: MatTableDataSource<ReportGenerator>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private reportService: ReportGeneratorService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getReports();
  }

  getReports() {
    this.reportService.getReportGenerators().subscribe((resp) => {
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
    this.reportService.deleteReportGenerator(item._id).subscribe((resp) => {
      this.getReports();
    });
  }
}
