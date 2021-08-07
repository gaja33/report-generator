import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { debounceTime, distinctUntilChanged, first } from "rxjs/operators";
import { ProductService } from "src/app/services/product/product.service";
import { CategoryService } from "src/app/services/category/category.service";
import { VendorServicesService } from "src/app/services/vendor/vendor-services.service";
import { MetalService } from "src/app/services/metal/metal.service";
import { ReportGeneratorService } from "src/app/services/report-generator/report-generator.service";
import { ReportMasterService } from "src/app/services/report-master/report-master.service";
import { AfterViewInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-report-generator",
  templateUrl: "./report-generator.component.html",
  styleUrls: ["./report-generator.component.scss"],
})
export class ReportGeneratorComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  category: any[];
  vendors: any[];
  thickness: any[];
  reportNumber: number;
  preffix: any;
  ToAddress: any;
  myControl: FormControl = new FormControl();
  filteredOptions: [];
  selectedA: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private vendorService: VendorServicesService,
    private metalService: MetalService,
    private reportService: ReportGeneratorService,
    private reportMasterService: ReportMasterService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;

    this.reportMasterService.getReportMasters().subscribe((resp) => {
      this.preffix = resp[0]["reportPrefix"];
    });

    this.categoryService.getCategorys().subscribe((resp) => {
      this.category = resp;
    });

    this.vendorService.getVendors().subscribe((resp) => {
      this.vendors = resp;
    });

    this.metalService.getMetals().subscribe((resp) => {
      this.thickness = resp;
    });

    this.form = this.formBuilder.group({
      reportNo: [""],
      skiDCNo: [""],
      custDCNo: [""],
      toAddress: [""],
      lotNo: [""],
      remarks: [""],
      parts: [[]],
    });

    if (!this.isAddMode) {
      this.reportService.getReportGenerator(this.id).subscribe((x) => {
        this.form.patchValue(x);
        this.selectedA = x.parts;
      });
    }

    this.myControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((result) => {
        this.productService.searchProduct(result).subscribe((result) => {
          this.filteredOptions = result;
        });
      });
  }

  ngAfterViewInit() {
    this.reportService.getReportGenerators().subscribe((resp) => {
      // Assign the data to the data source for the table to render
      if (resp.length === 0 && this.isAddMode) {
        this.reportMasterService.getReportMasters().subscribe((resp) => {
          this.form.controls["reportNo"].setValue(
            parseInt(resp[0]["opReportNo"]) + 1
          );
        });
      } else if (resp.length !== 0 && this.isAddMode) {
        this.reportService.getReportGenerators().subscribe((x) => {
          this.form.controls["reportNo"].setValue(
            parseInt(resp[resp.length - 1]["reportNo"]) + 1
          );
        });
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  getVendorDetails() {
    this.vendorService
      .getVendor(this.form.get("toAddress").value)
      .subscribe((resp) => {
        this.ToAddress = resp.address;
      });
  }

  selected(opt) {
    this.selectedA.push(opt);
  }

  deleteParts(i) {
    this.selectedA.splice(i, 1);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.form.controls["parts"].setValue(this.selectedA);
    if (this.isAddMode) {
      this.createReport();
    } else {
      this.updateReport();
    }
  }

  createReport() {
    this.reportService
      .createReportGenerator(this.form.value)
      .subscribe((response) => {
        this.router.navigate(["/reports"]);
      });
  }

  updateReport() {
    this.reportService
      .updateReportGenerator(this.id, this.form.value)
      .subscribe((response) => {
        this.router.navigate(["/reports"]);
      });
  }
}
