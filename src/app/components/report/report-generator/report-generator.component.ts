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
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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

  onSubmit(mode) {
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
    this.generatePdf(mode);
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

  async generatePdf(mode) {
    var documentDefinition = {
      content: [
        {
          layout: "noBorders",
          table: {
            headerRows: 0,
            widths: ["*", 150],
            body: [
              [
                {
                  image: await this.getBase64ImageFromURL(
                    "../../assets/logo.png",
                    "1"
                  ),
                  width: 300,
                },
                {
                  image: await this.getBase64ImageFromURL(
                    "../../assets/register.jpg",
                    "2"
                  ),
                  width: 100,
                  alignment: "right",
                },
              ],
            ],
          },
        },
        {
          layout: "noBorders",
          table: {
            headerRows: 0,
            widths: ["*"],
            body: [
              [
                `#32, Muthuraya Swamy Layout, Srigandakawal , Sunkadakatte, Bangalore - 560091.
                M: 7411466116, 98803688186, E : shreekamakshiindustries@yahoo.com `,
              ],
            ],
          },
        },
        {
          table: {
            headerRows: 0,
            widths: ["*", 200],
            body: [
              [
                {
                  text: "Final Inspection Report",
                  bold: true,
                  alignment: "center",
                  decoration: "underline",
                },
                {
                  layout: "lightHorizontalLines",
                  table: {
                    headerRows: 0,
                    widths: ["*", "auto"],
                    body: [
                      [
                        "Report No:",
                        `${this.preffix}${this.form.value.reportNo}`,
                      ],
                      [
                        "Report Date:",
                        `${new Date().toLocaleDateString("en-US")}`,
                      ],
                    ],
                  },
                },
              ],
            ],
          },
        },
        {
          table: {
            headerRows: 0,
            widths: ["*", "*"],
            body: [
              [
                `${this.form.value.toAddress.address}`,
                {
                  layout: "lightHorizontalLines",
                  table: {
                    headerRows: 0,
                    widths: [70, "*"],
                    body: [
                      ["SKI Dc No:", `${this.form.value.skiDCNo}`],
                      ["Cust DC No:", `${this.form.value.custDCNo}`],
                      ["Lot No:", `${this.form.value.lotNo}`],
                    ],
                  },
                },
              ],
            ],
          },
        },
        this.getPartsObject(this.form.value.parts),
        {
          //layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["*", 170, 190, 20],

            body: [
              [
                {
                  text: "Adhesion Test",
                  fontSize: 12,
                  alignment: "center",
                },
                {
                  text: "No peel off",
                  fontSize: 12,
                  alignment: "center",
                },
                {
                  text: "Bend test / Tape test/ Scratch test",
                  fontSize: 12,
                  alignment: "center",
                },
                {
                  text: "OK",
                  fontSize: 12,
                  alignment: "center",
                },
              ],
              [
                {
                  text: "Thickness Test",
                  fontSize: 12,
                  alignment: "center",
                },
                {
                  text: "As per coustomer specification",
                  fontSize: 12,
                  alignment: "center",
                },
                {
                  text: "Distructive machine",
                  fontSize: 12,
                  alignment: "center",
                },
                {
                  text: "OK",
                  fontSize: 12,
                  alignment: "center",
                },
              ],
              [
                {
                  text: "Appearance",
                  fontSize: 12,
                  alignment: "center",
                },
                {
                  text: "As mentioned below (SL.NO.2)",
                  fontSize: 12,
                  alignment: "center",
                },
                {
                  text: "Visual inpection 100 %",
                  fontSize: 12,
                  alignment: "center",
                },
                {
                  text: "OK",
                  fontSize: 12,
                  alignment: "center",
                },
              ],
            ],
          },
        },
        {
          //layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["*"],

            body: [
              [
                [
                  {
                    columns: [
                      {
                        // star-sized columns fill the remaining space
                        // if there's more than one star-column, available width is divided equally
                        width: 50,
                        text: "NOTE:",
                      },
                      {
                        // fixed width
                        width: "*",
                        text: "1) ALL THE TESTS CARRIED OUT AS PER COUSTOMER REQUIRMENTS.								",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        // star-sized columns fill the remaining space
                        // if there's more than one star-column, available width is divided equally
                        width: 50,
                        text: "",
                      },
                      {
                        // fixed width
                        width: "*",
                        text: "2) Visual inspection done for while patches, black marks, water marks,blisters, exposure of base metal,burnmarks , etc..								",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        // star-sized columns fill the remaining space
                        // if there's more than one star-column, available width is divided equally
                        width: 50,
                        text: "",
                      },
                      {
                        // fixed width
                        width: "*",
                        text: "3) All the plated components to be handled with clam hand and with gloves.								",
                      },
                    ],
                  },
                ],
              ],
            ],
          },
        },
        {
          //layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["*"],

            body: [
              [
                [
                  {
                    columns: [
                      {
                        // star-sized columns fill the remaining space
                        // if there's more than one star-column, available width is divided equally
                        width: 100,
                        text: "Remarks if any:",
                      },
                      {
                        // fixed width
                        width: "*",
                        text: `${this.form.value.remarks}`,
                      },
                    ],
                  },
                ],
              ],
            ],
          },
        },
        {
          //layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*"],

            body: [
              [
                "Inspected by	",
                "",
                "Approved by :",
                "",
                "Customer verified	",
                "",
              ],
              ["Date :", "", "Date :", "", "Date :", ""],
            ],
          },
        },
      ],
    };
    //pdfMake.createPdf(documentDefinition).open();
    switch (mode) {
      case "open":
        pdfMake.createPdf(documentDefinition).open();
        break;
      case "print":
        pdfMake.createPdf(documentDefinition).print();
        break;
      case "download":
        pdfMake.createPdf(documentDefinition).download();
        break;

      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  getPartsObject(parts) {
    const exs = [];

    parts.forEach((part, index) => {
      exs.push([
        `${index + 1}`,
        `${part.partName}`,
        `${part.partNumber}`,
        {
          layout: "noBorders",
          table: this.getThickenss(part.thickness, part.category),
        },
        `${part.lot}`,
      ]);
    });

    return {
      table: {
        headerRows: 1,
        widths: [35, "*", "*", "*", 50],
        body: [
          [
            "Sl No.",
            "PART NAME",
            "PART NUMBER",
            "PLATING THICKNESS",
            "Lot Size",
          ],
          ...exs,
        ],
      },
    };
  }

  getThickenss(thickness, category) {
    const thicks = [];
    thickness.forEach((thick) => {
      thicks.push([`${thick.metalName} - ${thick.thickness}`]);
    });

    return {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers

      headerRows: 1,
      widths: ["*"],

      body: [...thicks, [`${"Colour"} - ${category}`]],
    };
  }

  getBase64ImageFromURL(url, no) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        if (no === "1") {
          ctx.drawImage(img, 0, 0);
        } else {
          ctx.drawImage(img, 0, 0);
        }

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }
}
