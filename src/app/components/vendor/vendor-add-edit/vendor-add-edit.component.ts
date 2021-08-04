import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { VendorServicesService } from "src/app/services/vendor/vendor-services.service";

@Component({
  selector: "app-vendor-add-edit",
  templateUrl: "./vendor-add-edit.component.html",
  styleUrls: ["./vendor-add-edit.component.scss"],
})
export class VendorAddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  typesComp: { display: string; value: string }[];
  status: { display: string; value: string }[];
  showOthers: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vendorService: VendorServicesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.isAddMode = !this.id;
    this.typesComp = [
      { display: "Public Limited Co", value: "1" },
      { display: "Partnership Co", value: "2" },
      { display: "Proprietorship", value: "3" },
      { display: "Govt. Sector", value: "4" },
      { display: "Others", value: "5" },
    ];

    this.status = [
      { display: "MANUFACTURER", value: "1" },
      { display: "AUTHORISED DEALER", value: "2" },
      { display: "STOCKIST/TRADER", value: "3" },
      { display: "IMPORTER/INDIAN AGENT", value: "4" },
      { display: "SERVICE PROVIDER", value: "5" },
    ];

    this.form = this.formBuilder.group({
      compName: [""],
      type: [""],
      othersType: [""],
      gstNo: [""],
      panNo: [""],
      statusOfComp: [""],
      address: [""],
      mobileNumber: [""],
      phoneNumber: [""],
      contactPerson: [""],
      email: [""],
      city: [""],
      state: [""],
    });

    if (!this.isAddMode) {
      this.vendorService
        .getVendor(this.id)
        .subscribe((x) => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onChangeType() {
    if (this.form.get("type").value === "5") {
      this.showOthers = true;
    } else {
      this.showOthers = false;
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  createUser() {
    this.vendorService.createVendor(this.form.value).subscribe((response) => {
      console.log(response);
      this.router.navigate(["/vendors"]);
    });
  }

  updateUser() {
    this.vendorService
      .updateVendor(this.id, this.form.value)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(["/vendors"]);
      });
  }
}
